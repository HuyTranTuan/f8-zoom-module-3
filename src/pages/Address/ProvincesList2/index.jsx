import { useGetProvincesQuery } from "@/features/address/addressSlice";
import { Link } from "react-router";

function ProvincesList2() {
    const { isLoading, data } = useGetProvincesQuery();

    return (
        <div>
            <h1>Provinces list</h1>
            <Link to="/address/provinces">List 1</Link>
            <br />
            <Link to="/products">Products</Link>

            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <ul>
                    {data.map((province) => (
                        <li key={province.province_id}>{province.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ProvincesList2;
