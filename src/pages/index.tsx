import { GetServerSideProps } from "next";
import { gql, useQuery } from "@apollo/client";

const QUERY_RICK = gql`
  query {
    characters(page: 2, filter: { name: "rick" }) {
      info {
        count
      }
      results {
        name
      }
    }
    location(id: 1) {
      id
    }
    episodesByIds(ids: [1, 2]) {
      id
    }
  }
`;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      date: new Date().toISOString(),
    },
  };
};

export default function Home({ date }: any) {
  const { data } = useQuery(QUERY_RICK);

  return (
    <ul>
      {data.characters.results.map((result: any) => (
        <li key={result.name}>{result.name}</li>
      ))}
    </ul>
  );
}
