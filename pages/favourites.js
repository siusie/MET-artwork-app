import { useAtom } from 'jotai';
import { favouritesAtom } from '../store';
import ArtworkCard from '../components/ArtworkCard';
import { Row, Col, Card } from 'react-bootstrap';

export default function Favourites() {
    const [favouritesList] = useAtom(favouritesAtom);

    if (!favouritesList) return null;

    if (favouritesList) {
        return (
            <>
                <Row className="gy-4">
                    {
                        favouritesList?.length ?
                            favouritesList.map((currentObjectID) => {
                                return <Col lg={3} key={currentObjectID}><ArtworkCard objectID={currentObjectID} /></Col>
                            })
                            :
                            <Card>
                                <Card.Body>
                                    <h4>Nothing Here</h4>
                                    <Card.Text>
                                        Try adding some new artwork to the list.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                    }
                </Row>
            </>
        );
    }
}