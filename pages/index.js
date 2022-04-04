import { dehydrate, useQuery } from "react-query";
import Head from "next/head";
import Link from "next/link";
import { Grid, Card, Image, Text, Title } from "@mantine/core";

import { queryClient, getDogs } from "../src/api";

export async function getServerSideProps() {
  await queryClient.prefetchQuery("dogs", () => getDogs());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function Home() {
  const { data } = useQuery(["dogs"], () => getDogs());

  return (
    <div>
      <Grid>
        {data?.dogs.map((dog, i) => (
          <Grid.Col xs={12} md={6} lg={4} key={[dog.name, i].join(":")} p={5}>
            <Link href={`/dog/${dog.name}`} passHref>
              <Card>
                <Card.Section>
                  <Image height={350} src={dog.image} alt={dog.name} />
                </Card.Section>
                <Title order={3}>{dog.name}</Title>
                <Text>
                  {dog.weight} pound {dog.ageInWeeks} weeks old{" "}
                  {dog.sex.toLowerCase()} {dog.breed.toLowerCase()}
                </Text>
              </Card>
            </Link>
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
}