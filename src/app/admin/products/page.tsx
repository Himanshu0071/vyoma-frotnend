"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import toast from "react-hot-toast";

import {
    Trash2,
    Plus,
} from "lucide-react";

import {
    createProduct,
    deleteProduct,
} from "@/services/admin.service";

import { getProducts } from "@/services/product.service";

import { Product } from "@/types/product";

import { Input } from "@/components/ui/input";

import { Checkbox } from "@/components/ui/checkbox";



import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label";

/* =========================
   TYPES
========================= */


type ProductFormData = {
    title: string;
    description: string;
    price: string;
    category: string;
    // images: [];
    brand: string;
    // stock: string;
    // sizes: string;
    gender: string;
    discount: string;
    featured: boolean;
};
type VariantForm = {
    color: string;
    stock: string;
    images: File[];
};

const initialFormData: ProductFormData =
{
    title: "",
    description: "",
    price: "",
    category: "",
    // images: [],
    brand: "",
    // stock: "",
    // sizes: "",
    gender: "",
    discount: "",
    featured: false,
};


export default function AdminProductsPage() {
    const [category, setCategory] =
        useState("all");


    const [variants, setVariants] =
        useState<VariantForm[]>([
            {
                color: "",
                stock: "",
                images: [],
            },
        ]);

    // const [selectedFiles,
    //     setSelectedFiles] =
    //     useState<File[]>([]);

    const [selectedSizes, setSelectedSizes] =
        useState<string[]>([]);

    /* STATES */
    const [products, setProducts] =
        useState<Product[]>([]);

    const [loading, setLoading] =
        useState<boolean>(false);

    const [formData, setFormData] =
        useState<ProductFormData>(
            initialFormData
        );

    /* =========================
       FETCH PRODUCTS
    ========================= */

    const fetchProducts =
        async (): Promise<void> => {
            try {
                const data =
                    await getProducts();

                setProducts(data);
            } catch (error) {
                console.log(error);

                toast.error(
                    "Failed to fetch products"
                );
            }
        };

    useEffect(() => {
        fetchProducts();
    }, []);


    /* =========================
       HANDLE INPUT CHANGE
    ========================= */

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement
        >
    ): void => {
        const {
            name,
            value,
        } = e.target;

        setFormData(
            (
                prev
            ): ProductFormData => ({
                ...prev,

                [name]:
                    value,
            })
        );
    };

    /* =========================
       CREATE PRODUCT
    ========================= */

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();

        try {
            setLoading(true);

            const payload =
                new FormData();

            payload.append(
                "title",
                formData.title
            );

            payload.append(
                "description",
                formData.description
            );

            payload.append(
                "price",
                formData.price
            );

            payload.append(
                "category",
                formData.category
            );

            payload.append(
                "brand",
                formData.brand
            );

            payload.append(
                "gender",
                formData.gender
            );

            payload.append(
                "discount",
                formData.discount
            );

            payload.append(
                "featured",
                String(formData.featured)
            );

            payload.append(
                "sizes",
                JSON.stringify(
                    selectedSizes
                )
            );

            const variantData =
                variants.map(
                    ({
                        color,
                        stock,
                    }) => ({
                        color,
                        stock,
                    })
                );

            payload.append(
                "variants",
                JSON.stringify(
                    variantData
                )
            );

            variants.forEach(
                (
                    variant,
                    variantIndex
                ) => {
                    variant.images.forEach(
                        (file) => {
                            payload.append(
                                `variantImages_${variantIndex}`,
                                file
                            );
                        }
                    );
                }
            );

            await createProduct(
                payload
            );

            toast.success(
                "Product created"
            );

            setFormData(
                initialFormData
            );

            setSelectedSizes([]);

            setVariants([
                {
                    color: "",
                    stock: "",
                    images: [],
                },
            ]);

            fetchProducts();
        } catch (error) {
            console.log(error);

            toast.error(
                "Failed to create product"
            );
        } finally {
            setLoading(false);
        }
    };

    /* =========================
       DELETE PRODUCT
    ========================= */

    const handleDelete =
        async (
            id: string
        ): Promise<void> => {
            try {
                await deleteProduct(
                    id
                );

                toast.success(
                    "Product deleted"
                );

                fetchProducts();
            } catch (error) {
                console.log(error);

                toast.error(
                    "Delete failed"
                );
            }
        };

    useEffect(() => {
        fetchProducts();
    }, [category]);

    const addVariant = () => {
        setVariants([
            ...variants,
            {
                color: "",
                stock: "",
                images: [],
            },
        ]);
    };

    const removeVariant = (
        index: number
    ) => {
        setVariants(
            variants.filter(
                (_, i) => i !== index
            )
        );
    };

    const updateVariantColor = (
        index: number,
        value: string
    ) => {
        const updated = [...variants];

        updated[index].color =
            value;

        setVariants(updated);
    };

    const updateVariantStock = (
        index: number,
        value: string
    ) => {
        const updated = [...variants];

        updated[index].stock =
            value;

        setVariants(updated);
    };

    const updateVariantImages = (
        index: number,
        files: File[]
    ) => {
        const updated = [...variants];

        updated[index].images =
            files;

        setVariants(updated);
    };


    const sizes = [
        "XS",
        "S",
        "M",
        "L",
        "XL",
        "XXL",
    ];
    return (
        <div className=" flex flex-col gap-6 overflow-auto">
            {/* HEADER */}
            <div>
                <h1 className="text-2xl font-semibold">
                    Products
                </h1>

                <p className="text-sm text-gray-400 mt-1">
                    Manage your store products
                </p>
            </div>

            {/* CREATE PRODUCT */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-5">
                    <Plus size={18} />

                    <h2 className="text-lg font-semibold">
                        Add Product
                    </h2>
                </div>

                <form
                    onSubmit={
                        handleSubmit
                    }
                    className="grid md:grid-cols-2 w-full gap-4"
                >
                    <input
                        type="text"
                        name="title"
                        placeholder="Product Title"
                        value={
                            formData.title
                        }
                        onChange={
                            handleChange
                        }
                        className="h-11 px-4 rounded-xl bg-white/5 border border-white/10 outline-none text-sm"
                        required
                    />

                    <Select
                        value={formData.category}
                        onValueChange={(value) =>
                            setFormData({
                                ...formData,
                                category: value,
                            })
                        }                    >
                        <SelectTrigger className="w-full !h-11 bg-white/5 border-white/10 text-sm">
                            <SelectValue placeholder="Collections" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="all">
                                Select Category
                            </SelectItem>

                            <SelectItem value="tshirts">
                                T-Shirts
                            </SelectItem>

                            <SelectItem value="shirts">
                                Shirts
                            </SelectItem>

                            <SelectItem value="vest">
                                Vest
                            </SelectItem>

                            <SelectItem value="kurta">
                                Kurta
                            </SelectItem>

                            <SelectItem value="jeans">
                                Jeans
                            </SelectItem>

                            <SelectItem value="pant">
                                Pant
                            </SelectItem>

                            <SelectItem value="shoes">
                                Shoes
                            </SelectItem>

                            <SelectItem value="trousers">
                                Trousers
                            </SelectItem>

                            <SelectItem value="cargo">
                                Cargo
                            </SelectItem>

                            <SelectItem value="joggers">
                                Joggers
                            </SelectItem>

                            <SelectItem value="shorts">
                                Shorts
                            </SelectItem>
                        </SelectContent>
                    </Select>



                    <Select
                        value={formData.gender}
                        onValueChange={(
                            value: string
                        ) =>
                            setFormData({
                                ...formData,
                                gender: value,
                            })
                        }
                    >
                        <SelectTrigger className="w-full !h-11 bg-white/5 border-white/10 text-sm">
                            <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>

                        <SelectContent position="item-aligned"
                            className="min-w-[var(--radix-select-trigger-width)]"
                        >
                            <SelectGroup>
                                <SelectItem value="men">
                                    Men
                                </SelectItem>

                                <SelectItem value="women">
                                    Women
                                </SelectItem>

                                <SelectItem value="unisex">
                                    Unisex
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <Input
                        type="text"
                        placeholder="Brand"
                        value={formData.brand}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                brand: e.target.value,
                            })
                        }
                        className="h-11 bg-white/5 border-white/10 text-sm"
                    />

                    {/* <Input
                        type="number"
                        placeholder="Stock Quantity"
                        value={formData.stock}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                stock: e.target.value,
                            })
                        }
                        className="h-11 bg-white/5 border-white/10 text-sm"
                    /> */}

                    {/* <Input
                        type="text"
                        placeholder="Sizes (S,M,L,XL)"
                        value={formData.sizes}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                sizes: e.target.value,
                            })
                        }
                        className="h-11 bg-white/5 border-white/10 text-sm"
                    /> */}
                    <div className="space-y-3">
                        <Label>Sizes</Label>

                        <div className="flex flex-wrap gap-3">
                            {sizes.map((size) => (
                                <label
                                    key={size}
                                    className="flex items-center gap-2 border rounded-xl px-3 py-2 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedSizes.includes(
                                            size
                                        )}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedSizes([
                                                    ...selectedSizes,
                                                    size,
                                                ]);
                                            } else {
                                                setSelectedSizes(
                                                    selectedSizes.filter(
                                                        (s) => s !== size
                                                    )
                                                );
                                            }
                                        }}
                                    />

                                    {size}
                                </label>
                            ))}
                        </div>
                    </div>

                    <Input
                        type="number"
                        placeholder="Discount %"
                        value={formData.discount}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                discount:
                                    e.target.value,
                            })
                        }
                        className="h-11 bg-white/5 border-white/10 text-sm"
                    />

                    <div className="flex items-center gap-3">
                        <Checkbox
                            checked={
                                formData.featured
                            }
                            onCheckedChange={(
                                checked
                            ) =>
                                setFormData({
                                    ...formData,
                                    featured:
                                        checked as boolean,
                                })
                            }
                        />

                        <label className="text-sm text-gray-300">
                            Featured Product
                        </label>
                    </div>

                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={
                            formData.price
                        }
                        onChange={
                            handleChange
                        }
                        className="h-11 px-4 rounded-xl bg-white/5 border border-white/10 outline-none text-sm"
                        required
                    />
                    {/* <div className="space-y-4 flex justify-content-between gap-5">
                        <Label className="flex items-center">
                            Product Images
                        </Label>

                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={
                                handleImageChange
                            }
                        />

                        {uploading && (
                            <p className="text-sm text-blue-500">
                                Uploading images...
                            </p>
                        )}
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                        {selectedFiles.map(
                            (file, index) => (
                                <Image
                                    key={index}
                                    src={URL.createObjectURL(file)}
                                    alt=""
                                    width={100}
                                    height={100}
                                />
                            )
                        )}
                    </div> */}

                    <div className="md:col-span-2 space-y-6">
                        <Label>
                            Product Variants
                        </Label>

                        {variants.map(
                            (
                                variant,
                                index
                            ) => (
                                <div
                                    key={index}
                                    className="border rounded-xl p-4 space-y-4"
                                >
                                    <Input
                                        placeholder="Color"
                                        value={
                                            variant.color
                                        }
                                        onChange={(e) =>
                                            updateVariantColor(
                                                index,
                                                e.target.value
                                            )
                                        }
                                    />

                                    <Input
                                        type="number"
                                        placeholder="Stock"
                                        value={
                                            variant.stock
                                        }
                                        onChange={(e) =>
                                            updateVariantStock(
                                                index,
                                                e.target.value
                                            )
                                        }
                                    />

                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={(e) =>
                                            updateVariantImages(
                                                index,
                                                Array.from(
                                                    e.target.files ||
                                                    []
                                                )
                                            )
                                        }
                                    />

                                    <div className="grid grid-cols-4 gap-2">
                                        {variant.images.map(
                                            (
                                                file,
                                                fileIndex
                                            ) => (
                                                <Image
                                                    key={fileIndex}
                                                    src={URL.createObjectURL(
                                                        file
                                                    )}
                                                    alt=""
                                                    width={100}
                                                    height={100}
                                                />
                                            )
                                        )}
                                    </div>

                                    {variants.length >
                                        1 && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeVariant(
                                                        index
                                                    )
                                                }
                                                className="text-red-500"
                                            >
                                                Remove Variant
                                            </button>
                                        )}
                                </div>
                            )
                        )}

                        <button
                            type="button"
                            onClick={addVariant}
                            className="px-4 py-2 border rounded-xl"
                        >
                            + Add Variant
                        </button>
                    </div>

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={
                            formData.description
                        }
                        onChange={
                            handleChange
                        }
                        className="md:col-span-2 min-h-[100px] p-4 rounded-xl bg-white/5 border border-white/10 outline-none text-sm"
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="h-11 rounded-xl bg-gradient-to-r from-[#7C8CFF] via-[#C084FC] to-[#FFB38A] text-sm font-medium"
                    >
                        {loading
                            ? "Creating..."
                            : "Create Product"}
                    </button>
                </form>
            </div>

            {/* PRODUCT TABLE */}
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-auto flex-1">
                {/* TABLE HEADER */}
                <div className="grid grid-cols-[80px_1.5fr_1fr_120px_100px] gap-4 px-5 py-4 border-b border-white/10 text-xs uppercase tracking-wider text-gray-400">
                    <span>
                        Image
                    </span>

                    <span>
                        Product
                    </span>

                    <span>
                        Category
                    </span>

                    <span>
                        Price
                    </span>

                    <span>
                        Action
                    </span>
                </div>

                {/* PRODUCTS */}
                <div className="divide-y divide-white/5">
                    {products.map(
                        (product) => (
                            <div
                                key={
                                    product._id
                                }
                                className="grid grid-cols-[80px_1.5fr_1fr_120px_100px] gap-4 items-center px-5 py-4 hover:bg-white/[0.03] transition"
                            >
                                {/* IMAGE */}
                                <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                                    <Image
                                        src={
                                            product.variants?.[0]
                                                ?.images?.[0] ||
                                            "/placeholder.png"
                                        }
                                        alt={product.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {/* TITLE */}
                                <div>
                                    <h3 className="text-sm font-medium line-clamp-1">
                                        {
                                            product.title
                                        }
                                    </h3>

                                    <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                                        {
                                            product.description
                                        }
                                    </p>
                                </div>

                                {/* CATEGORY */}
                                <div className="text-sm text-gray-300">
                                    {
                                        product.category
                                    }
                                </div>

                                {/* PRICE */}
                                <div className="text-sm font-medium">
                                    ₹
                                    {
                                        product.price
                                    }
                                </div>

                                {/* DELETE */}
                                <button
                                    onClick={() =>
                                        handleDelete(
                                            product._id
                                        )
                                    }
                                    className="w-9 h-9 rounded-lg bg-red-500/10 hover:bg-red-500 transition flex items-center justify-center text-red-400"
                                >
                                    <Trash2
                                        size={16}
                                    />
                                </button>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}