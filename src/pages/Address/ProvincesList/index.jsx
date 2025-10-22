import { Link } from "react-router";
import { useGetProvincesQuery } from "@/features/address/addressSlice";

function ProvincesList() {
    const { isLoading, data } = useGetProvincesQuery();

    return (
        <div>
            <h1>Provinces list</h1>
            <Link to="/address/provinces2">List 2</Link>
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

export default ProvincesList;
