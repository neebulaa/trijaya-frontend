import { useState } from "react";
import IconCheck from "../../assets/icons/IconCheck";
import IconLocation from "../../assets/icons/IconLocation";
import AppModal from "../../components/AppModal";
import SearchBar from "../../components/SearchBar";
import HeaderProgress from "../../components/HeaderProgress";

export default function ProfileManageAddresses() {
	const [changeAddressFlow, setChangeAddressFlow] = useState({
		"new-address": {
			title: "New Address",
			active: false,
		},
		"new-address-pinpoint": {
			title: "New Address",
			active: false,
		},
		"new-address-detail": {
			title: "New Address",
			active: false,
		},
		"new-address-another-way": {
			title: "New Address",
			active: false,
		},
	});

	function changingAddressFlow(slug: string, state: boolean) {
		setChangeAddressFlow((prev) => ({
			...prev,
			[slug]: {
				...prev[slug as keyof typeof prev],
				active: state,
			},
		}));
	}

	return (
		<>
			<h2 className="mb-1-05">Manage Adress</h2>
			<SearchBar placeholder="Find the name of the destination address/city/subdistrict for delivery." />
			<button
				className="btn mt-1 btn-outline w-100"
				onClick={() => {
					changingAddressFlow("new-address", true);
				}}
			>
				Add New Address
			</button>

			{/* card container */}
			<div
				style={{
					overflowY: "auto",
					maxHeight: "400px",
				}}
			>
				<div className="card-bordered active mt-1 flex items-center gap-05">
					<div>
						<div className="flex gap-05">
							<div className="highlight">
								<IconLocation width="20" height="20" />
							</div>
							<p className="semibold">Rumah Michelle</p>
						</div>
						<p className="mt-05">
							Sungai Jawi, Kec. Pontianak Kota, Kota Pontianak,
							Kalimantan Barat , Pontianak Kota, Kota Pontianak,
							Kalimantan Barat, 628983167799
						</p>
						<button className="btn btn-actor btn-pill mt-1">
							Change Address
						</button>
					</div>
					<div>
						<IconCheck width="32" height="32" />
					</div>
				</div>

				<div className="card-bordered mt-1 flex items-center gap-05">
					<div>
						<div className="flex gap-05">
							<div className="highlight">
								<IconLocation width="20" height="20" />
							</div>
							<p className="semibold">Rumah Michelle</p>
						</div>
						<p className="mt-05">
							Sungai Jawi, Kec. Pontianak Kota, Kota Pontianak,
							Kalimantan Barat , Pontianak Kota, Kota Pontianak,
							Kalimantan Barat, 628983167799
						</p>
						<button className="btn btn-actor btn-pill mt-1">
							Change Address
						</button>
					</div>
					<div>
						<button className="btn btn-actor mt-1">Select</button>
					</div>
				</div>
			</div>

			{(changeAddressFlow["new-address"].active ||
				changeAddressFlow["new-address-pinpoint"].active ||
				changeAddressFlow["new-address-detail"].active) && (
				<AppModal
					title="New Address"
					close={() => {
						changingAddressFlow("new-address", false);
						changingAddressFlow("new-address-pinpoint", false);
						changingAddressFlow("new-address-detail", false);
					}}
				>
					<HeaderProgress
						navigations={[
							"Cari Lokasi Pengirimanmu",
							"Pinpoint",
							"Lengkapi Detail",
						]}
						actives={[
							changeAddressFlow["new-address"].active ||
								changeAddressFlow["new-address-pinpoint"]
									.active ||
								changeAddressFlow["new-address-detail"].active,
							changeAddressFlow["new-address-pinpoint"].active ||
								changeAddressFlow["new-address-detail"].active,
							changeAddressFlow["new-address-detail"].active,
						]}
					/>

					{/* different modal view */}
					{changeAddressFlow["new-address"].active && (
						<>
							<div className="mt-1">
								<SearchBar placeholder="Find the name of the destination address/city/subdistrict for delivery." />
							</div>
							<p className="mt-1">
								Want another way? Fill in the{" "}
								<button
									className="btn-link highlight bold pointer"
									onClick={() => {
										changingAddressFlow(
											"new-address-another-way",
											true
										);
										changingAddressFlow(
											"new-address",
											false
										);
									}}
								>
									address manually
								</button>{" "}
							</p>
							<button
								className="btn"
								onClick={() => {
									changingAddressFlow(
										"new-address-pinpoint",
										true
									);
									changingAddressFlow("new-address", false);
								}}
							>
								Next
							</button>
						</>
					)}
					{changeAddressFlow["new-address-pinpoint"].active && (
						<>
							<h2 className="mt-1">Pinpoint your location</h2>
							<div className="carding mt-1">
								<div className="carding-image">
									<div
										style={{
											width: "100%",
											height: "200px",
											background: "lightgray",
										}}
									></div>
								</div>
								<div className="carding-content">
									<h3>Parit Tokaya</h3>
									<p>
										Pontianak Selatan, Kota Pontianak,
										Kalimantan Barat
									</p>
								</div>
							</div>
							<button
								className="btn mt-1 w-100"
								onClick={() => {
									changingAddressFlow(
										"new-address-pinpoint",
										false
									);

									changingAddressFlow(
										"new-address-detail",
										true
									);
								}}
							>
								Select location and continue to fill address
							</button>
							<p className="mt-05 text-center">
								Want another way? Fill in the{" "}
								<button
									className="btn-link highlight bold pointer"
									onClick={() => {
										changingAddressFlow(
											"new-address-another-way",
											true
										);
										changingAddressFlow(
											"new-address-pinpoint",
											false
										);
									}}
								>
									address manually
								</button>{" "}
							</p>
						</>
					)}
					{changeAddressFlow["new-address-detail"].active && (
						<>
							<h2 className="mt-1">
								Complete the detailed address
							</h2>
							<div className="input-icon mt-1-05">
								<IconLocation
									width="24"
									height="24"
									className="ml-1"
								/>
								<input
									type="text"
									value="Parit Tokaya, Pontianak Selatan, Kota Pontianak,
								Kalimantan Barat"
									readOnly={true}
								/>
								<div className="pointer highlight bold ml-auto mr-1">
									Set
								</div>
							</div>
							<form className="mt-1-05">
								<div className="split-item gap-1">
									<div className="input-box w-100">
										<label htmlFor="name">
											Recipient's name{" "}
											<span className="accent">*</span>
										</label>
										<input
											type="text"
											id="name"
											name="name"
											placeholder="Edwin"
										/>
									</div>
									<div className="input-box w-100">
										<label htmlFor="label">
											Label{" "}
											<span className="accent">*</span>
										</label>
										<input
											type="text"
											id="label"
											name="label"
											placeholder="Hendly"
										/>
									</div>
								</div>

								<div className="input-box w-100 mt-1">
									<label htmlFor="phone">
										Phone Number (Whatsapp)
									</label>
									<div className="flex gap-05">
										<div className="flag-phone">
											<div className="flag">
												<div className="red"></div>
												<div className="white"></div>
											</div>
											<select
												name="countryPhone"
												id="countryPhone"
											>
												<option value="indonesia">
													+62
												</option>
												<option value="malaysia">
													+60
												</option>
												<option value="singapore">
													+65
												</option>
											</select>
										</div>
										<input
											className="w-100"
											type="text"
											id="phone"
											name="phone"
											placeholder="089796245748"
										/>
									</div>
								</div>

								<div className="input-box w-100 mt-1">
									<label htmlFor="Address">
										Address{" "}
										<span className="accent">*</span>
									</label>
									<input
										type="text"
										id="Address"
										name="Address"
									/>
								</div>

								<div className="input-box w-100 mt-1">
									<label htmlFor="Address">
										Note For Courier{" "}
										<span className="muted italic">
											(Optional)
										</span>
									</label>
									<input
										type="text"
										id="Address"
										name="Address"
									/>
								</div>

								<label
									htmlFor="main-address"
									className="btn-link flex items-center gap-05 mt-1-05"
									style={{
										fontSize: "1rem",
									}}
								>
									<input
										type="checkbox"
										style={{
											width: "15px",
											height: "15px",
										}}
										id="main-address"
									/>
									<span
										style={{
											color: "var(--black)",
										}}
									>
										Make it the main address
									</span>
								</label>

								<button
									type="button"
									className="btn w-100 mt-1-05"
								>
									Save
								</button>
							</form>
						</>
					)}
				</AppModal>
			)}
			{changeAddressFlow["new-address-another-way"].active && (
				<AppModal
					title="New Address"
					close={() =>
						changingAddressFlow("new-address-another-way", false)
					}
				>
					<h2>Complete the detailed address</h2>
					<form className="mt-1-05">
						<div className="split-item gap-1">
							<div className="input-box w-100">
								<label htmlFor="name">
									Recipient's name{" "}
									<span className="accent">*</span>
								</label>
								<input
									type="text"
									id="name"
									name="name"
									placeholder="Edwin"
								/>
							</div>
							<div className="input-box w-100">
								<label htmlFor="label">
									Label <span className="accent">*</span>
								</label>
								<input
									type="text"
									id="label"
									name="label"
									placeholder="Hendly"
								/>
							</div>
						</div>

						<div className="input-box w-100 mt-1">
							<label htmlFor="phone">
								Phone Number (Whatsapp)
							</label>
							<div className="flex gap-05">
								<div className="flag-phone">
									<div className="flag">
										<div className="red"></div>
										<div className="white"></div>
									</div>
									<select
										name="countryPhone"
										id="countryPhone"
									>
										<option value="indonesia">+62</option>
										<option value="malaysia">+60</option>
										<option value="singapore">+65</option>
									</select>
								</div>
								<input
									className="w-100"
									type="text"
									id="phone"
									name="phone"
									placeholder="089796245748"
								/>
							</div>
						</div>

						<div className="split-item gap-1 mt-1">
							<div className="input-box w-100">
								<label htmlFor="city">
									City <span className="accent">*</span>
								</label>
								<input type="text" id="city" name="city" />
							</div>
							<div className="input-box w-100">
								<label htmlFor="subdistrict">
									Subdistrict{" "}
									<span className="accent">*</span>
								</label>
								<input
									type="text"
									id="subdistrict"
									name="subdistrict"
								/>
							</div>
						</div>

						<div className="input-box w-100 mt-1">
							<label htmlFor="Address">
								Address <span className="accent">*</span>
							</label>
							<input type="text" id="Address" name="Address" />
						</div>

						<div className="input-box w-100 mt-1">
							<label htmlFor="Address">
								Note For Courier{" "}
								<span className="muted italic">(Optional)</span>
							</label>
							<input type="text" id="Address" name="Address" />
						</div>

						<div className="input-icon mt-1-05">
							<IconLocation
								width="24"
								height="24"
								className="ml-1"
							/>
							<p
								style={{
									padding: ".8rem",
									paddingLeft: ".2rem",
								}}
							>
								You haven't pinpointed yet.{" "}
								<span className="highlight semibold">
									Set pinpoint{" "}
									<span className="italic">(Optional)</span>
								</span>
							</p>
							<div className="pointer highlight bold ml-auto mr-1">
								Set
							</div>
						</div>

						<label
							htmlFor="main-address"
							className="btn-link flex items-center gap-05 mt-1-05"
							style={{
								fontSize: "1rem",
							}}
						>
							<input
								type="checkbox"
								style={{
									width: "15px",
									height: "15px",
								}}
								id="main-address"
							/>
							<span
								style={{
									color: "var(--black)",
								}}
							>
								Make it the main address
							</span>
						</label>

						<button type="button" className="btn w-100 mt-1-05">
							Save
						</button>
					</form>
				</AppModal>
			)}
		</>
	);
}
