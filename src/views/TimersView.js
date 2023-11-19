import styled from "styled-components";

const TimersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;


const TimersView = () => {

    return (
        <TimersContainer>
            <h2>Timer Queue</h2>

        </TimersContainer>
    );
};

export default TimersView
