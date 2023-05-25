const handleDataOverview = (data) => {
  let currentYear = "" + new Date().getFullYear();
  let filterData = data?.map(
    (item) =>
      item?.month?.includes(currentYear) && {
        ...item,
        monthVal: +item.month.slice(-2),
      }
  );

  let checkIsExist;

  for (let i = 1; i <= 12; i++) {
    checkIsExist = filterData?.some((item) => item?.monthVal === i);
    if (!checkIsExist) {
      filterData.push({
        total: 0,
        month: i >= 10 ? `${currentYear}-${i}` : `${currentYear}-0${i}`,
        monthVal: i,
      });
    }
  }

  return filterData.sort((a, b) => a.monthVal - b.monthVal);
};

export { handleDataOverview };
