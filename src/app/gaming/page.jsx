import { Subcategory } from "@/components/finance/Subcategory";
import axios from "axios";

import base_url from "@/components/helper/baseurl";
const category = "gaming";

const page = async () => {
  try {
    const response = await axios.get(`${base_url}/filter/${category}`);
    const data = response.data;

    return (
      <>
        <Subcategory category={category} data={data} />
      </>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error loading data.</div>;
  }
};

export default page;
