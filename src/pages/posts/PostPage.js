import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import {
  LinkIcon,
  LockClosedIcon,
  LockOpenIcon,
} from "../../assets/icons/heroicons";
import { useEffect, useMemo, useState } from "react";

import { Chip } from "@mui/material";
import { IconWrapper } from "../../components/IconWrapper";
import { getPosts, lockPost, unlockPost } from "../../api/postApi";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import { useSearchParams } from "react-router-dom";

const PostPage = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 9,
  });

  const queryClient = useQueryClient();

  // using usesSearchParam
  const [searchParam] = useSearchParams("");

  const [filter, setFilter] = useState({});

  useEffect(() => {
    const filter = {};
    if (searchParam.get("id")) {
      filter.id = searchParam.get("id");
    }
    if (searchParam.get("sortBy")) {
      filter.sort = searchParam.get("sortBy");
    }
    setFilter(filter);
  }, [searchParam]);

  const storeKey = ["posts", filter];
  const updatePost = () => {
    queryClient.invalidateQueries(storeKey);
  };
  const lockPostMutation = useMutation(lockPost, {
    onSuccess: () => {
      updatePost();
    },
  });

  const unLockPostMutation = useMutation(unlockPost, {
    onSuccess: () => {
      updatePost();
    },
  });
  const queryFn = getPosts;
  const columns = [
    { field: "id", headerName: "ID", width: 240 },
    { field: "title", headerName: "Title", width: 540 },
    { field: "user", headerName: "User", width: 320 },
    {
      field: "status",
      headerName: "Status",
      renderCell: (params) => {
        switch (params.row.status) {
          case "ACTIVE":
            return (
              <Chip
                label="Active"
                color="success"
                variant="outlined"
                className="w-20 !h-7"
              />
            );
          case "LOCKED":
            return (
              <Chip
                label="Lock"
                color="warning"
                variant="outlined"
                className="w-20 !h-7"
              />
            );
          case "REPORTED":
            return (
              <Chip
                label="Reported"
                color="error"
                variant="outlined"
                className="w-20 !h-7"
              />
            );
          default:
            return (
              <Chip
                label="Active"
                color="success"
                variant="outlined"
                className="w-20 !h-7"
              />
            );
        }
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          onClick={() => {
            window.open(
              `${process.env.REACT_APP_FRONTEND_URL}/posts/${params.row.id}`
            );
          }}
          icon={
            <IconWrapper>
              <LinkIcon />
            </IconWrapper>
          }
          label="Delete"
        />,
        params.row.status === "LOCKED" ? (
          <GridActionsCellItem
            onClick={() => {
              unLockPostMutation.mutate(params.row.id);
            }}
            icon={
              <IconWrapper>
                <LockClosedIcon />
              </IconWrapper>
            }
            label="Delete"
          />
        ) : (
          <GridActionsCellItem
            onClick={() => {
              lockPostMutation.mutate(params.row.id);
            }}
            icon={
              <IconWrapper>
                <LockOpenIcon />
              </IconWrapper>
            }
            label="Clock"
          />
        ),
      ],
    },
  ];
  const { data, fetchNextPage, isLoading, isFetching } = useInfiniteQuery(
    storeKey,
    ({ pageParam }) => queryFn({ ...filter, page: pageParam }),
    {
      getNextPageParam: (lastPage) => {
        const { last, number } = lastPage;
        return last ? undefined : number + 1;
      },
    }
  );

  const [rowCountState, setRowCountState] = useState(
    data?.pages[0]?.totalElements || 0
  );

  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      data?.pages[0]?.totalElements !== undefined
        ? data?.pages[0]?.totalElements
        : prevRowCountState
    );
  }, [data]);

  let rows = useMemo(() => {
    if (data?.pages[paginationModel.page]?.content) {
      return data.pages[paginationModel.page].content.map((item) => {
        return {
          id: item.id,
          title: item.title,
          user: item.user.username,
          status: item.status,
        };
      });
    }
    return [];
  }, [data, paginationModel]);
  return (
    <div className="flex justify-center w-full">
      <div className="w-[1350px] bg-white mt-7">
        <div style={{ height: 614, width: "100%" }}>
          <DataGrid
            slots={{
              toolbar: () => {
                return (
                  <GridToolbarContainer>
                    <GridToolbarFilterButton></GridToolbarFilterButton>
                  </GridToolbarContainer>
                );
              },
            }}
            rows={rows}
            columns={columns}
            rowCount={rowCountState}
            loading={isLoading || isFetching}
            paginationModel={paginationModel}
            pageSizeOptions={[9]}
            paginationMode="server"
            onPaginationModelChange={(newModel) => {
              setPaginationModel(newModel);
              fetchNextPage();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PostPage;
