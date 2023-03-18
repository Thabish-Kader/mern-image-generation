import { useState, useEffect } from "react";
import { Loader } from "../components/Loader";
import axios from "axios";
import { Card } from "../components/Card";
import { FormField } from "../components/FormField";

const RenderCards = ({ data, title }: { data?: TPost[]; title: string }) => {
	if (data?.length! > 0) {
		return (
			<>
				{data?.map((post) => (
					<Card key={post._id} {...post} />
				))}
			</>
		);
	}

	return (
		<h2 className="mt-5 font-bold text-[#6449ff text-xl uppercase]">
			{title}
		</h2>
	);
};

const Home = () => {
	const [loading, setLoading] = useState(false);
	const [allPost, setAllPost] = useState<TPost[]>();
	const [searchText, setSearchText] = useState("");
	const [searchedResults, setSearchedResults] = useState();
	const [searchTimeOut, setSearchTimeOut] = useState<number>();

	useEffect(() => {
		const fetchPosts = async () => {
			setLoading(true);
			try {
				const response = await axios.get(
					"http://localhost:8080/api/v1/post",
					{
						headers: { "Content-Type": "application/json" },
					}
				);
				if (response.status === 200) {
					setAllPost(response.data);
				}
			} catch (error) {
				alert(error);
			} finally {
				setLoading(false);
			}
		};
		fetchPosts();
	}, []);

	const handleSearchChange = (e: any) => {
		clearTimeout(searchTimeOut);
		setSearchText(e.target.value);
		setSearchTimeOut(
			setTimeout(() => {
				const searchResults = allPost?.filter(
					(item) =>
						item.name
							.toLowerCase()
							.includes(searchText.toLowerCase()) ||
						item.prompt
							.toLowerCase()
							.includes(searchText.toLowerCase())
				);
				setSearchedResults(searchedResults);
			}, 500)
		);
	};

	return (
		<section className="max-w-7xl mx-auto ">
			<div>
				<h1 className="font-extrabold text-[#222328] text-[32px]">
					The Community Showcase
				</h1>
				<p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
					Lets redefine the world of art and how you perceive the real
					world with your mind
				</p>

				<div className="mt-16">
					<FormField
						labelName="Search posts"
						type="text"
						name="text"
						placeholder="Search posts"
						value={searchText}
						handleChange={handleSearchChange}
					/>
				</div>

				<div className="mt-10">
					{loading ? (
						<div className="flex justify-center items-center">
							<Loader />
						</div>
					) : (
						<>
							{searchText && (
								<h2 className="font-medium text-[#666e75] text-xl mb-3">
									Showing results for{" "}
									<span className="text-[#222328]">
										{searchText}
									</span>
								</h2>
							)}
							<div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3 ">
								{searchText ? (
									<RenderCards
										data={searchedResults}
										title="No search results found"
									/>
								) : (
									<>
										<RenderCards
											data={allPost}
											title="No posts found"
										/>
									</>
								)}
							</div>
						</>
					)}
				</div>
			</div>
		</section>
	);
};

export default Home;
