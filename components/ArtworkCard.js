import Error from 'next/error'
import useSWR from 'swr';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';


export default function ArtworkCard(props) {

    const router = useRouter();

    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`);

    function doNavigation(e, route) {
        router.push(route);
    }

    if (error) {
        return (<Error statusCode={404} />);
    }
    else if (data?.objectID) {
        return (<>
            <Card>
                {data.primaryImageSmall ? <Card.Img variant="top" src={data.primaryImageSmall} /> : <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg" thumbnail/>}
                <Card.Body>
                    <Card.Title>
                        {data?.title ? data.title : "N/A"}
                    </Card.Title>
                    <Card.Text>
                        <strong>Date:</strong> {data?.objectDate ? data.objectDate : "N/A"} <br />
                        <strong>Classification:</strong> {data?.classification ? data.classification : "N/A"}  <br />
                        <strong>Medium:</strong> {data?.medium ? data.medium : "N/A"} <br />
                    </Card.Text>
                    <Link href={`/artwork/${data?.objectID}`} passHref><a target="_blank"><Button onClick={(e) => { doNavigation(e, `/artwork/${data?.objectID}`) }} variant="outline-primary" target="_blank">ID: {data?.objectID}</Button></a></Link>
                </Card.Body>
            </Card>

        </>);
    }
    else {
        return null;
    }
}