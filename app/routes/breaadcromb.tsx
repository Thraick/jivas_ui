import { useLocation } from "@remix-run/react";
import { useEffect, useState } from "react";
import { localStorageService } from "~/resolvers/cache";

export default function BreadCrumb(props: { name: string }) {

    const location = useLocation();
    const [bread, setBread] = useState<{ name: string, path: string }[]>([]);


    useEffect(() => {
        const localbread = localStorageService.getItem('bread')
        const currentbread = {
            name: props.name,
            path: location.pathname
        }
        let updatedbread: { name: string, path: string }[] = [];

        if (localbread) {
            updatedbread = [...localbread];
            const index = updatedbread.findIndex((bread) => bread.name === currentbread.name);
            if (index !== -1) {
                updatedbread = updatedbread.slice(0, index + 1);
            } else {
                updatedbread.push(currentbread);
            }
        } else {
            updatedbread.push(currentbread);
        }


        setBread(updatedbread)
        console.log(updatedbread)
    }, [])

    return (
        <>
            {
                bread.map((item: any) => {
                    <div>{item.name}</div>
                })
            }
        </>
    )
}


// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';

// interface BreadcrumbProps {
//   separator?: string;
// }

// const Breadcrumb: React.FC<BreadcrumbProps> = ({ separator = '/' }) => {
//   const location = useLocation();
//   const match = useRouteMatch();

//   const paths = location.pathname.split('/').filter((path) => path !== '');

//   return (
//     <div className="breadcrumb">
//       {paths.map((path, index) => {
//         const routePath = paths.slice(0, index + 1).join('/');
//         const isLast = index === paths.length - 1;

//         return (
//           <React.Fragment key={index}>
//             <Link to={`${match.url}/${routePath}`}>{path}</Link>
//             {!isLast && <span className="separator">{separator}</span>}
//           </React.Fragment>
//         );
//       })}
//     </div>
//   );
// };

// export default Breadcrumb;
