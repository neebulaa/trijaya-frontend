import { useMemo, useState, useEffect, ChangeEvent } from "react";
import ProductCard from "../../components/ProductCard";
import productsData from "../../assets/data/products.json";
import DropdownFilter from "../../components/DropdownFilter";
import { ProductType } from "../../dto/ProductType";
import IconChevronRight from "../../assets/icons/IconChevronRight";
import IconChevronLeft from "../../assets/icons/IconChevronLeft";
import { CategoryType } from "../../dto/CategoryType";
import AppApi from "../../config/AppApi";
import { APIHeaderParamsType } from "../../dto/APIHeaderParamsType";

const MAX_PAGE_ON_PAGINATION = 5;

export default function Catalog() {
	const [gridSystem, setGridSystem] = useState("columns");
	const [products, setProducts] = useState<ProductType[]>([]);
	const [categories, setCategories] = useState<CategoryType[]>([]);
	const [productsPerPage, setProductsPerPage] = useState(10);
	const [currentCategory, setCurrentCategory] = useState("all");
	const [currentPage, setCurrentPage] = useState(1);
	const [maxPage, setMaxPage] = useState(1);

	// const [currentColors, setCurrentColors] = useState<string[]>([]);
	// const [currentSize, setCurrentSize] = useState("all");
	const [currentPriceRange, setCurrentPriceRange] = useState("all");
	// const [currentMaterials, setCurrentMaterials] = useState<string[]>([]);

	useEffect(() => {
		getCategories();
	}, []);

	useEffect(() => {
		getProducts();
	}, [currentPage, currentCategory, productsPerPage, currentPriceRange]);

	async function getProducts() {
		const params: APIHeaderParamsType = {
			per_page: productsPerPage,
			page: currentPage,
		};
		if (currentCategory != "all") {
			params.category = currentCategory;
		}
		const response = await AppApi.get(`products`, {
			params,
		});
		const data = response.data.data;
		// const products = filterByPriceRange(data.data);
		// setMaxPage(Math.max(1, Math.ceil(products.length / productsPerPage)));
		setMaxPage(data.meta.last_page);
		setProducts(data.data);
	}

	async function getCategories() {
		const response = await AppApi.get(`categories`);
		const categoriesData = response.data.data.data;
		setCategories(categoriesData);
	}

	// const sizes = useMemo(
	// 	() => [
	// 		"all",
	// 		...productsData.reduce<string[]>((acc, curr) => {
	// 			if (!acc.includes(curr.size)) {
	// 				acc.push(curr.size);
	// 			}
	// 			return acc;
	// 		}, []),
	// 	],
	// 	[productsData]
	// );

	// const colors = useMemo(
	// 	() =>
	// 		productsData.reduce<string[]>((acc, curr) => {
	// 			curr.colors.forEach((color) => {
	// 				if (!acc.includes(color)) {
	// 					acc.push(color);
	// 				}
	// 			});
	// 			return acc;
	// 		}, []),
	// 	[productsData]
	// );

	// const materials = useMemo(
	// 	() =>
	// 		productsData.reduce<string[]>((acc, curr) => {
	// 			curr.materials.forEach((color) => {
	// 				if (!acc.includes(color)) {
	// 					acc.push(color);
	// 				}
	// 			});
	// 			return acc;
	// 		}, []),
	// 	[productsData]
	// );

	// useEffect(() => {
	// 	filter();
	// }, [
	// 	currentCategory,
	// 	currentColors,
	// 	currentPriceRange,
	// 	currentMaterials,
	// 	currentSize,
	// ]);

	function setCategory(category: string) {
		setCurrentCategory(category);
		setCurrentPage(1);
	}

	// function setSize(size: string) {
	// 	setCurrentSize(size);
	// }

	// function setColors(colors: string[]) {
	// 	setCurrentColors(colors);
	// }

	function setPriceRange(priceRange: string) {
		setCurrentPriceRange(priceRange);
		setCurrentPage(1);
	}

	// function setMaterials(materials: string[]) {
	// 	setCurrentMaterials(materials);
	// }

	function setPage(to: string | number) {
		if (typeof to == "number") {
			if (to == currentPage) return;
			setCurrentPage(to);
		}

		if (to == "next" && currentPage < maxPage) {
			setCurrentPage((prev) => prev + 1);
		} else if (to == "previous" && currentPage > 1) {
			setCurrentPage((prev) => prev - 1);
		}
	}

	function setTotalProductsPerPage(e: ChangeEvent<HTMLSelectElement>) {
		const value = Number(e.currentTarget.value);
		setProductsPerPage(value);
		setCurrentPage(1);
	}

	// function filter() {
	// 	filterByColors();
	// 	filterByPriceRange();
	// 	filterBySize();
	// 	filterByMaterials();
	// }

	// function filterBySize() {
	// 	setProducts((latestProducts) => {
	// 		return currentSize == "all"
	// 			? latestProducts
	// 			: latestProducts.filter(
	// 					(product) => product.size == currentSize
	// 			  );
	// 	});
	// }

	function filterByPriceRange(products: ProductType[]) {
		function getPriceRangeCheck(product: ProductType) {
			if (product.price == null) return;
			const priceRangeCheckOptions = {
				all: true,
				"0 - 50K": product.price >= 0 && product.price <= 50000,
				"50K - 200K": product.price >= 50000 && product.price <= 200000,
				"200K - 1.000K":
					product.price >= 200000 && product.price <= 1000000,
				"1.000K+": product.price >= 1000000,
			};
			return priceRangeCheckOptions[
				currentPriceRange as keyof typeof priceRangeCheckOptions
			];
		}

		if (currentPriceRange != "all") {
			return products.filter((product) => getPriceRangeCheck(product));
		}

		return products;
	}

	// function filterByColors() {
	// 	setProducts((latestProducts) => {
	// 		if (currentColors.length == 0) return latestProducts;
	// 		return latestProducts.filter((product) => {
	// 			let valid = false;
	// 			currentColors.every((color) => {
	// 				if (product.colors.includes(color)) {
	// 					valid = true;
	// 					return true;
	// 				} else {
	// 					valid = false;
	// 					return false;
	// 				}
	// 			});
	// 			return valid;
	// 		});
	// 	});
	// }

	// function filterByMaterials() {
	// 	setProducts((latestProducts) => {
	// 		if (currentMaterials.length == 0) return latestProducts;
	// 		return latestProducts.filter((product) => {
	// 			let valid = false;
	// 			currentMaterials.every((material) => {
	// 				if (product.materials.includes(material)) {
	// 					valid = true;
	// 					return true;
	// 				} else {
	// 					valid = false;
	// 					return false;
	// 				}
	// 			});
	// 			return valid;
	// 		});
	// 	});
	// }

	function sortProducts(e: ChangeEvent<HTMLSelectElement>) {
		const sortBy = e.target.value;

		if (sortBy == "a-z") {
			setProducts((latestProducts) => {
				return [...latestProducts].sort((a, b) => {
					if (a.name < b.name) {
						return -1;
					}
					if (a.name > b.name) {
						return 1;
					}
					return 0;
				});
			});
		} else if (sortBy == "z-a") {
			setProducts((latestProducts) => {
				return [...latestProducts].sort((a, b) => {
					if (a.name < b.name) {
						return 1;
					}
					if (a.name > b.name) {
						return -1;
					}
					return 0;
				});
			});
		} else if (sortBy == "pl-ph") {
			setProducts((latestProducts) => {
				return [...latestProducts].sort((a, b) => {
					if (a.price < b.price) {
						return -1;
					}
					if (a.price > b.price) {
						return 1;
					}
					return 0;
				});
			});
		} else if (sortBy == "ph-pl") {
			setProducts((latestProducts) => {
				return [...latestProducts].sort((a, b) => {
					if (a.price < b.price) {
						return 1;
					}
					if (a.price > b.price) {
						return -1;
					}
					return 0;
				});
			});
		}
	}

	return (
		<section className="container" id="catalog">
			<aside className="catalog-sidebar">
				<header className="section-header">
					<div className="title">
						<h3>Produk Terlaris</h3>
						<h2>Katalog Produk</h2>
					</div>
				</header>
				<section className="catalog-filters-vertical">
					<DropdownFilter
						title="Kategori Produk"
						items={["all", ...categories.map((cat) => cat.name)]}
						type="link"
						onFilter={setCategory}
						currentItem={currentCategory}
						open={true}
					/>
					{/* <DropdownFilter
						title="Warna"
						items={colors}
						type="checkbox"
						onFilter={setColors}
						currentItem={currentColors}
					/> */}
					<DropdownFilter
						title="Harga"
						items={[
							"all",
							"0 - 50K",
							"50K - 200K",
							"200K - 1.000K",
							"1.000K+",
						]}
						type="radio"
						onFilter={setPriceRange}
						currentItem={currentPriceRange}
					/>
					{/* <DropdownFilter
						title="Ukuran"
						items={sizes}
						type="radio"
						onFilter={setSize}
						currentItem={currentSize}
					/> */}
					{/* <DropdownFilter
						title="Bahan"
						items={materials}
						type="checkbox"
						onFilter={setMaterials}
						currentItem={currentMaterials}
					/> */}
				</section>
			</aside>
			<section className="catalog-products">
				<section className="catalog-filters-horizontal flex gap-1 items-center">
					<p>
						Showing page {currentPage} - {maxPage} of{" "}
						{products.length} results
					</p>
					<select id="catalog-sort" onChange={sortProducts}>
						<option value="a-z">Alphabetical - A to Z</option>
						<option value="z-a">Alphabetical - Z to A</option>
						<option value="pl-ph">Price - Low to High</option>
						<option value="ph-pl">Price - High to Low</option>
					</select>
					<div className="btn-split">
						<button
							onClick={() => setGridSystem("columns")}
							className={`${
								gridSystem == "columns" ? "active" : ""
							}`}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 18 18"
								fill="currentColor"
							>
								<path d="M8 0H0V8H8V0Z" />
								<path d="M8 10H0V18H8V10Z" />
								<path d="M18 0H10V8H18V0Z" />
								<path d="M18 10H10V18H18V10Z" />
							</svg>
						</button>
						<button
							onClick={() => setGridSystem("rows")}
							className={`${
								gridSystem == "rows" ? "active" : ""
							}`}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="16"
								viewBox="0 0 18 16"
								fill="currentColor"
							>
								<path d="M18 4H0V0H18V4ZM18 6H0V10H18V6ZM18 12H0V16H18V12Z" />
							</svg>
						</button>
					</div>
				</section>
				<section
					className={`cards-list ${
						gridSystem == "rows" ? "list-rows" : ""
					}`}
				>
					{products.length == 0
						? `Currently no products with category ${currentCategory}`
						: products.map((product) => (
								<ProductCard key={product.id} {...product} />
						  ))}
				</section>
				<section className="catalog-pagination">
					<select
						id="catalog-perpage"
						onChange={setTotalProductsPerPage}
						value={productsPerPage}
					>
						<option value={10}>Show 10</option>
						<option value={20}>Show 20</option>
						<option value={50}>Show 50</option>
						<option value={100}>Show 100</option>
					</select>
					<section className="btn-split">
						<button
							onClick={() => setPage("previous")}
							className={`${currentPage == 1 ? "inactive" : ""}`}
							disabled={currentPage == 1}
						>
							<IconChevronLeft width={"25"} height={"25"} />
						</button>
						{new Array(
							MAX_PAGE_ON_PAGINATION > maxPage
								? maxPage
								: MAX_PAGE_ON_PAGINATION
						)
							.fill(0)
							.map((_, i) => {
								let page = i + 1;
								const pageMinThreshold =
									MAX_PAGE_ON_PAGINATION -
									Math.floor(MAX_PAGE_ON_PAGINATION / 2);
								const pageMaxThreshold =
									maxPage -
									Math.floor(MAX_PAGE_ON_PAGINATION / 2);
								let currentPageToWatch = currentPage;
								if (currentPageToWatch >= pageMaxThreshold) {
									currentPageToWatch = pageMaxThreshold;
								}

								if (currentPageToWatch > pageMinThreshold) {
									page +=
										currentPageToWatch - pageMinThreshold;
								}

								return (
									<button
										onClick={() => setPage(page)}
										key={i}
										className={`${
											page == currentPage ? "active" : ""
										}`}
									>
										{page}
									</button>
								);
							})}
						<button
							onClick={() => setPage("next")}
							disabled={currentPage == maxPage}
							className={`${
								currentPage == maxPage ? "inactive" : ""
							}`}
						>
							<IconChevronRight width={"25"} height={"25"} />
						</button>
					</section>
				</section>
			</section>
		</section>
	);
}
