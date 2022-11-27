/**
 * Chapter 2.
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType("blocks-demo/visiting-card", {
	title: __("Visiting Card", "blocks-demo"),
	icon: "admin-users",
	category: "blocks-demo",
	edit() {
		return (
			<div className="visiting-card">
				<figure className="photo">
					<img src="http://wordpressmeetup.local/wp-content/uploads/2022/11/face.png" />
				</figure>
				<h3>{__("John Doe", "blocks-demo")}</h3>
				<div className="description">
					<p>{__("John doe is an expert WordPress developer who specialize in custom themes and plugins.", "blocks-demo")}</p>
				</div>
			</div>
		);
	},
	save() {
		return (
			<div className="visiting-card">
				<figure className="photo">
					<img src="http://wordpressmeetup.local/wp-content/uploads/2022/11/face.png" />
				</figure>
				<h3>{__("John Doe", "blocks-demo")}</h3>
				<div className="description">
					<p>{__("John doe is an expert WordPress developer who specialize in custom themes and plugins.", "blocks-demo")}</p>
				</div>
			</div>
		);
	}
});
