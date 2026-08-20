"use client"

import {
  Image,
  Container,
  Title,
  Text,
  Button,
  SimpleGrid,
  Center,
} from "@mantine/core";
import classes from "./index.module.css";
import Link from "next/link";
import { useEffect } from "react";

function Error({
  error,
  reset,
}) {
 useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
  
  return (
    <Container className={classes.root}>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <Image src={"/image.svg"} className={classes.mobileImage} />
        <div>
          <Text className={classes.title}>
            Oops! We couldn’t find that page.
          </Text>
          <Text c="dimmed" size="md" fw={500}>
            It looks like the page you're looking for has either moved or
            doesn't exist. Don't worry, though we're here to help!
            <br />
            <br />
            Here’s what you can do:
            <br />
          </Text>
          <ul>
            <li>
              <Text span fw={600}>
                Browse Categories:
              </Text>{" "}
              <Text span opacity={0.7}>
                Find what you're looking for by checking out our popular
                categories.
              </Text>
            </li>
            <li>
              <Text span fw={600}>
                Search for Products:
              </Text>{" "}
              <Text span opacity={0.7}>
                Use our search bar to find specific items quickly.
              </Text>
            </li>
            <li>
              <Text span fw={600}>
                Return to the Homepage:
              </Text>{" "}
              <Text span opacity={0.7}>
                Start fresh and explore our latest products.
              </Text>
            </li>
          </ul>
          <Button
            variant="filled"
            size="md"
            component={Link}
            href="/"
            mt="xl"
            className={classes.control}
          >
            Get back to home page
          </Button>
        </div>
        <Center h="100%">
          <Image src={"/image.svg"} className={classes.desktopImage} />
        </Center>
      </SimpleGrid>
    </Container>
  );
}

export default Error;
