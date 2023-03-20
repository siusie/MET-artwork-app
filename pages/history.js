import { useAtom } from "jotai";
import { searchHistoryAtom } from "../store";
import { useRouter } from "next/router";
import { Card, ListGroup, Button } from 'react-bootstrap';
import { removeFromHistory } from "../lib/userData";
import styles from '../styles/History.module.css';

function History() {
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const router = useRouter();

    if (!searchHistory) return null;

    let parsedHistory = [];
    searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    });

    function historyClicked(e, index) {
        Object.keys(parsedHistory[index]).length > 1 ? router.push(`/artwork?${searchHistory[index]}`) : router.push(`/artwork?title=true&q=${searchHistory[index]}`);
    }

    async function removeHistoryClicked(e, index) {
        e.stopPropagation(); // stop the event from trigging other events
        setSearchHistory(await removeFromHistory(searchHistory[index]));
    }

    if (!parsedHistory?.length) {
        return (
            <>
                <Card>
                    <Card.Body>
                        <h4>Nothing Here</h4>
                        <Card.Text>
                            Try searching for some artwork.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </>
        );
    }
    else if (parsedHistory?.length) {
        return (
            <ListGroup variant="active">
                {parsedHistory.map((historyItem, index) =>
                (
                    <ListGroup.Item className={styles.historyListItem} onClick={e => { historyClicked(e, index) }} key={index} >
                        {Object.keys(historyItem).map(key => (<span key={key}>{key}: <strong>{historyItem[key]}</strong>&nbsp;</span>))}
                        <Button className="float-end" variant="outline-info" size="sm" onClick={e => removeHistoryClicked(e, index)} >&times;</Button>
                    </ListGroup.Item>

                ))}
            </ListGroup>
        );
    }
}
export default History;