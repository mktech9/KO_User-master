import { Grid, GridCol, Paper } from "@mantine/core";
import SortInput from "./sort";
import Paginate from "./pagination";

const SortingPagination = ({ count, noSort }) => {
  return (
    <>
      <Paper px={"xs"} py={"xs"} withBorder visibleFrom="md">
        <Grid align="stretch">
          <GridCol
            visibleFrom="md"
            span={3}
            style={{ visibility: noSort ? "hidden" : "visible" }}
          >
            <SortInput />
          </GridCol>
          <Paginate count={count} />
        </Grid>
      </Paper>
      <Paper px={"xs"} py={"xs"} hiddenFrom="md">
        <Grid align="stretch">
          <GridCol
            visibleFrom="md"
            span={3}
            style={{ visibility: noSort ? "hidden" : "visible" }}
          >
            <SortInput />
          </GridCol>
          <Paginate count={count} />
        </Grid>
      </Paper>
    </>
  );
};

export default SortingPagination;
