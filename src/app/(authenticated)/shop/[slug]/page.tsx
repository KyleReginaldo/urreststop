"use client";
import { useParams } from "next/navigation";

function ShopDetails() {
  const params = useParams<{ slug: string }>();

  return <div>slug: {params.slug}</div>;
}

export default ShopDetails;
