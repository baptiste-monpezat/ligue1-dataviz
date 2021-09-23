import * as React from "react";
import { ResponsiveBump } from "@nivo/bump";
import { useQuery, gql } from "@apollo/client";
import styled, { keyframes } from "styled-components";

const SEASONRESULTS = gql`
  query seasonResults($season: String!) {
    seasonResults(season: $season) {
      id: team
      data: evolution {
        x: day
        y: ranking
      }
      color
    }
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`;

const Bump = ({ season }) => {
  const { data, loading, error } = useQuery(SEASONRESULTS, {
    variables: { season: season },
    fetchPolicy: "no-cache",
  });

  if (error) {
    console.error(error);
    return null;
  }

  return (
    <div className="bump">
      {loading ? (
        <Rotate>
          <img height="50" src="soccer.png" />
        </Rotate>
      ) : (
        <ResponsiveBump
          data={data.seasonResults}
          margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
          colors={{ datum: "color" }}
          lineWidth={3}
          activeLineWidth={6}
          inactiveLineWidth={3}
          inactiveOpacity={0.15}
          pointSize={10}
          activePointSize={16}
          inactivePointSize={0}
          pointColor={{ theme: "background" }}
          pointBorderWidth={3}
          activePointBorderWidth={3}
          pointBorderColor={{ from: "serie.color" }}
          axisTop={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "",
            legendPosition: "middle",
            legendOffset: -36,
          }}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Journée",
            legendPosition: "middle",
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Classement",
            legendPosition: "middle",
            legendOffset: -40,
          }}
        />
      )}
    </div>
  );
};

export default Bump;
