import { useForm } from 'react-hook-form';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import { addToHistory } from '../lib/userData';

export default function AdvancedSearch() {

    const { register, handleSubmit, formState: { errors }
    } = useForm({
        defaultValues: {
            searchBy: 'title',
            geoLocation: '',
            medium: '',
            isOnView: false,
            isHighlight: false,
            q: ''
        }
    })

    const router = useRouter();
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    async function submitForm(data) {
        let queryString = `${data.searchBy}=true`;
        if (data.geoLocation) {
            queryString += `&geoLocation=${data.geoLocation}`;
        }
        if (data.medium) {
            queryString += `&medium=${data.medium}`;
        }
        queryString += `&isOnView=${data.isOnView}&isHighlight=${data.isHighlight}&q=${data.q}`;
        router.push(`/artwork?${queryString}`);
        setSearchHistory(await addToHistory(queryString));
    }

    return (
        <>
            <Form onSubmit={handleSubmit(submitForm)}>

                <Row>
                    <Col>

                        <Form.Group className="mb-3">
                            <Form.Label>Search Query</Form.Label>
                            <Form.Control className={errors.q && 'is-invalid'} type="text" placeholder="" name="q"  {...register('q', { required: true })} />
                        </Form.Group>

                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Label>Search By</Form.Label>
                        <Form.Select name="searchBy" className="mb-3" {...register('searchBy')}>
                            <option value="title">Title</option>
                            <option value="tags">Tags</option>
                            <option value="artistOrCulture">Artist or Culture</option>
                        </Form.Select>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Geo Location</Form.Label>
                            <Form.Control type="text" placeholder="" name="geoLocation" {...register('geoLocation')} />
                            <Form.Text className="text-muted">
                                Case Sensitive String (&quot;Europe&quot;, &quot;France&quot;, &quot;Paris&quot;, &quot;China&quot;, &quot;New York&quot;, etc.), with multiple values separated by the vertical bar symbol <b>|</b>
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Medium</Form.Label>
                            <Form.Control type="text" placeholder="" name="medium" {...register('medium')} />
                            <Form.Text className="text-muted">
                                Case Sensitive String (&quot;Ceramics&quot;, &quot;Furniture&quot;, &quot;Paintings&quot;, &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with multiple values separated by the vertical bar symbol <b>|</b>
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check {...register('isHighlight')}
                            type="checkbox"
                            label="Highlighted"
                            name="isHighlight"
                        />
                        <Form.Check {...register('isOnView')}
                            type="checkbox"
                            label="Currently on View"
                            name="isOnView"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <br />
                        <Button variant="outline-primary" type="submit">
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
}