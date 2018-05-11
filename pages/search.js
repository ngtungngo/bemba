import React, { Fragment } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { search, searchDebounced } from "../store/search/actions";
import Content from "../components/Content";
import SearchInput from "../components/Search";
import Player from "../components/Player";
import Navigation from "../components/Navigation";
import StationList from "../components/StationList";
import Zoom from "../components/Icons/Search";

let mapProps = ({ search }) => ({ stations: search.results });
let ConnectedList = connect(mapProps)(StationList);

export let Search = () => (
  <Fragment>
    <SearchInput />
    <Content>
      <ConnectedList />
    </Content>
    <Player hidden={true} />
    <Navigation hidden={false} />
  </Fragment>
);

Search.getInitialProps = async function({ store, query, req }) {
  if (req) {
    await store.dispatch(search(query));
  } else {
    await store.dispatch(searchDebounced(query));
  }

  return { query };
};

let Placeholder = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  flex-flow: column;
  height: 100%;

  svg {
    flex: 1 1 auto;
    color: #333;
    stroke-width: 2px;
    width: 128px;
    height: 128px;
  }
`;

export default Search;
