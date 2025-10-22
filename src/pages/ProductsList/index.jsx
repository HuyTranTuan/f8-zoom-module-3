import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { Link } from "react-router";
import { motion } from "motion/react";

import { useFetchProductsList, useProductsList } from "@/features/product";
import { selectLoading as selectProductLoading } from "@/features/product";
// import useInfinityLoad from "@/hooks/useInfinityLoad";

function ProductsList() {
    const [page, setPage] = useState(1);
    const lastItemRef = useRef();

    useFetchProductsList({ page, limit: 20 });

    const products = useProductsList();
    const loading = useSelector(selectProductLoading);
    const lastPage = useSelector((state) => state.product.pagination.last_page);

    const handleLoadMore = useCallback(() => {
        if (loading || page >= lastPage) return;
        setPage(page + 1);
    }, [page, lastPage, loading]);

    // useInfinityLoad({
    //     bottomOffset: -200,
    //     onEnd: handleLoadMore,
    // });

    useEffect(() => {
        if (!products.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        handleLoadMore();
                    }
                });
            },
            {
                rootMargin: "0px 0px 200px 0px",
            }
        );

        const element = lastItemRef.current;

        observer.observe(element);

        return () => observer.unobserve(element);
    }, [products, handleLoadMore]);

    return (
        <div>
            <Helmet>
                <title>Products List</title>
                <meta
                    name="description"
                    content="Description of products list"
                />
            </Helmet>

            <motion.h1 animate={{ x: 100 }}>Products list</motion.h1>
            <Link to="/address/provinces">List 1</Link>
            <div>
                <ul>
                    {products.map((product) => (
                        <li ref={lastItemRef} key={product.id}>
                            {product.title}
                        </li>
                    ))}
                </ul>
            </div>
            {loading && <div>Loading...</div>}
        </div>
    );
}

export default ProductsList;
