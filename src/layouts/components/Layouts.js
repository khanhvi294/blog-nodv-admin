// import { Fragment, useEffect, useMemo, useState } from "react";
// import { useSelector } from "react-redux";
// import { matchPath, useLocation } from "react-router-dom";
// import { appRoutes, routeConfig } from "../../routers/AppRouter";
// import DefaultLayout from "../DefaultLayout";

// //import HeaderOnlyLayout from "./HeaderOnly";

// export const layouts = {
//   DEFAULT: "DEFAULT",
//   HEADER_ONLY: "HEADER_ONLY",
//   NONE: "NONE",
// };

// const Layout = ({ children }) => {
//   console.log("layouttt");
//   const { isLogin } = useSelector((state) => state.user.data);
//   const [layout, setLayout] = useState(layouts.HEADER_ONLY);
//   const { pathname } = useLocation();

//   const renderLayout = useMemo(() => {
//     let LayoutComponent;
//     switch (layout) {
//       case layouts.DEFAULT:
//         LayoutComponent = DefaultLayout;
//         break;
//       case layouts.HEADER_ONLY:
//         //  LayoutComponent = HeaderOnlyLayout;
//         break;
//       case layouts.NONE:
//         LayoutComponent = Fragment;
//         break;
//       default:
//         LayoutComponent = DefaultLayout;
//     }
//     return <LayoutComponent>{children}</LayoutComponent>;
//   }, [children, layout]);

//   useEffect(() => {
//     routeConfig.forEach((item) => {
//       const isMatch = matchPath(
//         item.children ? `${item.path}/*` : item.path, // if has children, match all sub routes
//         pathname
//       );

//       if (isMatch) {
//         if (pathname === appRoutes.HOME) {
//           // && isLogin
//           setLayout(layouts.DEFAULT);
//           return true;
//         }

//         setLayout(item.layout);
//         return true;
//       }
//     });
//   }, [isLogin, pathname]);

//   return <>{renderLayout}</>;
// };

// export default Layout;
