import { Row, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'

export default function Home() {
  return (
    <>
      <Row>
        <Col>
          <Image fluid rounded src="https://i0.wp.com/thecitylife.org/wp-content/uploads/2022/06/The-Metropolitan-Museum-of-Art-Photo-Kate-Glicksberg-NYC-and-Company.jpg?resize=2048%2C1365&ssl=1" alt="the MET" />
          <br /><br />
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <p>The Metropolitan Museum of Art of New York City, colloquially &quot;the Met&quot;, is the largest art museum in the Americas. Its permanent collection contains over two million works, divided among 17 curatorial departments. The main building at 1000 Fifth Avenue, along the Museum Mile on the eastern edge of Central Park on Manhattan&apos;s Upper East Side, is by area one of the world&apos;s largest art museums. A much smaller second location, The Cloisters at Fort Tryon Park in Upper Manhattan, contains an extensive collection of art, architecture, and artifacts from medieval Europe.</p>
        </Col>
        <Col lg={6}>
          <p>The Metropolitan Museum of Art was founded in 1870 with its mission to bring art and art education to the American people. The museum&apos;s permanent collection consists of works of art from classical antiquity and ancient Egypt, paintings, and sculptures from nearly all the European masters, and an extensive collection of American and modern art. The Met maintains extensive holdings of African, Asian, Oceanian, Byzantine, and Islamic art. </p>

          <p><a href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" target="_blank" rel="noreferrer" >https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art</a></p>
        </Col>
      </Row>
    </>
  );
}
