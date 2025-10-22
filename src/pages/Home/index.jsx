import { Button } from "@/components/ui/button";

import styles from "./HomePage.module.scss";

function HomePage() {
  return (
    <div className={styles.wrapper}>
      Home Page
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <div className="flex min-h-svh flex-col items-center justify-center">
        <Button>Click me</Button>
      </div>
    </div>
  );
}

export default HomePage;
