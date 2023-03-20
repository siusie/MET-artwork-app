import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Error from 'next/error';
import { Row, Col, Card, Pagination } from 'react-bootstrap';
import ArtworkCard from '../../components/ArtworkCard';
import validObjectIDList from '../../public/data/validObjectIDList.json';

const PER_PAGE = 12

export default function Artwork() {

    const [artworkList, setArtworkList] = useState();
    const [page, setPage] = useState(1);

    const router = useRouter();
    let finalQuery = router.asPath.split('?')[1];

    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`);

    function previousPage() {
        if (page > 1) {
            setPage(prevValue => prevValue - 1);
        }
    }
    function nextPage() {
        if (page < artworkList.length) {
            setPage(prevValue => prevValue + 1);
        }
    }
    function clickEvent(left, e, right = "") {
        if (left) {
            previousPage();
        }
        else if (right) {
            nextPage();
        }
    }

    useEffect(() => {

        if (data) {
            let results = [];
            let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x));

            for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
                const chunk = filteredResults.slice(i, i + PER_PAGE);
                results.push(chunk);
            }
            setArtworkList(results);
        }
        setPage(1);

    }, [data]);


    if (error) {
        return (<Error statusCode={404} />);
    }
    else if (artworkList) {
        return (
            <>
                <Row className="gy-4">
                    {
                        artworkList?.length > 0 ?
                            artworkList[page - 1].map((currentObjectID) => {
                                return <Col lg={3} key={currentObjectID}><ArtworkCard objectID={currentObjectID} /></Col>
                            })
                            :
                            <Card>
                                <Card.Body>
                                    <h4>Nothing Here</h4>
                                    <Card.Text>
                                        Try searching for something else.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                    }
                </Row>

                {
                    artworkList.length > 0 &&
                    <Row>
                        <Col>
                            <br />
                            <Pagination>
                                <Pagination.Prev onClick={(e) => { clickEvent("left", e); }} disabled={page == 1} />
                                <Pagination.Item active>{page}</Pagination.Item>
                                <Pagination.Next onClick={(e) => { clickEvent("", e, "right"); }} disabled={artworkList[page - 1].length < PER_PAGE} />
                            </Pagination>
                        </Col>
                    </Row>
                }
            </>
        );
    } else {
        return null;
    }
}