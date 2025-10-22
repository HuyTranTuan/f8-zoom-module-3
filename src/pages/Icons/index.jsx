// import { faYoutube } from "@fortawesome/free-brands-svg-icons";
// import { faSpinner } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Button from "@/components/Button";
import {
  faLink,
  // faHeart,
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

function Icons() {
  // Fake
  let loading = false;

  return (
    <div>
      <h1>Icons</h1>

      <Button icon={faLink} loading={loading} onClick={() => alert("Clicked!")}>
        Button 1
      </Button>

      <Button icon={faLink}>Button 2</Button>

      <Button rightIcon={faChevronRight}>Button 3</Button>

      <Button leftIcon={faChevronLeft} rightIcon={faChevronRight}>
        Button 4
      </Button>

      {/* <button
                style={{
                    fontSize: 20,
                    color: "red",
                    "--fa-animation-duration": "1s",
                }}
            >
                <FontAwesomeIcon
                    spin={loading}
                    icon={loading ? faSpinner : faYoutube}
                />
                Click me!
            </button>

            <FontAwesomeIcon icon={faHeart} beat /> */}

      <br />
      <br />
      <br />
    </div>
  );
}

export default Icons;
