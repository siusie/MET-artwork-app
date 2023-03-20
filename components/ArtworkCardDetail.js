import Error from 'next/error';
import useSWR from 'swr';
import { useAtom } from 'jotai';
import { favouritesAtom } from '../store';
import { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { addToFavourites } from '../lib/userData';
import { removeFromFavourites } from '../lib/userData';


export default function ArtworkCardDetail(props) {

    const { data, error } = useSWR(props.objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}` : null);

    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [showAdded, addShow] = useState(false);

    useEffect(() => {
        addShow(favouritesList?.includes(props.objectID))
    }, [favouritesList])

    async function favouritesClicked() {
        if (showAdded) {
            setFavouritesList(await removeFromFavourites(props.objectID))
            addShow(false);
        }
        else if (!showAdded) {
            setFavouritesList(await addToFavourites(props.objectID))
            addShow(true);
        }
    }

    if (error) {
        return (<Error statusCode={404} />);
    }
    else if (data?.length == 0) {
        return null
    }
    return (<>
        <Card>
            {data?.primaryImage && <Card.Img variant="top" src={data.primaryImage} />}
            <Card.Body>
                <Card.Title>
                    {data?.title ? data.title : "N/A"}
                </Card.Title>
                <Card.Text>
                    <strong>Date:</strong> {data?.objectDate ? data.objectDate : "N/A"} <br />
                    <strong>Classification:</strong> {data?.classification ? data.classification : "N/A"}  <br />
                    <strong>Medium:</strong> {data?.medium ? data.medium : "N/A"} <br /><br />
                    <strong>Artist:</strong> {data?.artistDisplayName ? data.artistDisplayName : "N/A"}
                    {data?.artistDisplayName && ' ( '}
                    {data?.artistDisplayName && <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer" >wiki</a>}
                    {data?.artistDisplayName && ' )'}
                    <br />
                    <strong>Credit Line:</strong> {data?.creditLine ? data.creditLine : "N/A"} <br />
                    <strong>Dimensions:</strong> {data?.dimensions ? data.dimensions : "N/A"} <br /><br />
                    <Button variant={showAdded ? 'primary' : 'outline-primary'} onClick={(e) => favouritesClicked()}>{showAdded ? '+ Favourite (added)' : '+ Favourite'}</Button>
                </Card.Text>
            </Card.Body>
        </Card>

    </>);
}