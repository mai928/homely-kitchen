import About from "@/components/About";
import Blogs from "@/components/Blogs";
import Contact from "@/components/Contact";
import Partner from "@/components/Video";
import Services from "@/components/Brands";
import Slider from "@/components/slider/Slider";
import Video from "@/components/Video";
import Brands from "@/components/Brands";
import Team from "@/components/Team";
import Portfolio from "@/components/Portfolio";

export default function Home({params}) {
	return (
		<main className="z-0">
			<Slider />
			<About params={params} />
			<Portfolio/>
			{/* <Brands/> */}
			<Video/>
			<Blogs />
			<Contact params={params} />
			{/* <Team/> */}
		</main>
	);
}
