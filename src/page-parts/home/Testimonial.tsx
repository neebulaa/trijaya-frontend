import { useEffect, useState } from "react";
import IconChevronRight from "../../assets/icons/IconChevronRight";
import IconChevronLeft from "../../assets/icons/IconChevronLeft";
import RatingStars from "../../components/RatingStars";
import fetching from "../../utils/fetching";
import { TestimonialType } from "../../dto/TestimonialType";

export default function Testimonial() {
	const [testimonials, setTestimonials] = useState<TestimonialType[]>([]);
	const [testimonialsPerPage] = useState(3);
	const [currentSlide, setCurrentSlide] = useState(1);
	const maxSlide = Math.ceil(testimonials.length / testimonialsPerPage);

	useEffect(() => {
		getTestimonies();
	}, []);

	async function getTestimonies() {
		const response = await fetching("get", "testimonies");
		console.log(response);
		setTestimonials(response.data.data);
	}

	function setSlide(to: string) {
		if (to == "next" && currentSlide < maxSlide) {
			setCurrentSlide((prev) => prev + 1);
		} else if (to == "previous" && currentSlide > 1) {
			setCurrentSlide((prev) => prev - 1);
		}
	}

	function paginatedTestimonials() {
		const firstIndex = (currentSlide - 1) * testimonialsPerPage;
		const lastIndex = firstIndex + testimonialsPerPage;
		return testimonials.slice(firstIndex, lastIndex);
	}

	return (
		<section
			className="container"
			id="testimonials"
			style={{
				marginTop: "2rem",
			}}
		>
			<header className="section-header">
				<div className="title">
					<h3>Testimoni</h3>
					<h2>Apa yang dikatakan kustomer kami</h2>
				</div>
				<div className="navigation-buttons">
					<button
						onClick={() => setSlide("previous")}
						className={`${currentSlide == 1 ? "inactive" : ""}`}
						disabled={currentSlide == 1}
					>
						<IconChevronLeft width={"25"} height={"25"} />
					</button>
					<button
						onClick={() => setSlide("next")}
						className={`${
							currentSlide == maxSlide ? "inactive" : ""
						}`}
						disabled={currentSlide == maxSlide}
					>
						<IconChevronRight width={"25"} height={"25"} />
					</button>
				</div>
			</header>
			<section className="testimonial-cards mt-3">
				{paginatedTestimonials().map((testimonial) => (
					<div className="testimonial-card" key={testimonial.id}>
						<RatingStars rating={testimonial.rating} />
						<p className="mt-05">{testimonial.text}</p>
						<div className="testimonial-user mt-05">
							<img
								src={`${testimonial.avatar}`}
								alt={
									`${import.meta.env.VITE_APP_NAME} - ` +
									testimonial.name
								}
							/>
							<div className="testimonial-about-user">
								<h5 className="semibold">{testimonial.name}</h5>
								<p>{testimonial.occupation}</p>
							</div>
						</div>
					</div>
				))}
			</section>
		</section>
	);
}
