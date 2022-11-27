/**
 * Chapter 3.
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;

registerBlockType("blocks-demo/visiting-card", {
	title: __("Visiting Card", "blocks-demo"),
	icon: "admin-users",
	category: "blocks-demo",
	attributes: {
		profileName: {
			type: "string",
			source: "html",
			selector: ".profile-name"
		}
	},
	edit: props => {
		const {
			className,
			attributes: { profileName },
			setAttributes
		} = props;

		const updateprofileName = newProfileName => {
			setAttributes({ profileName: newProfileName });
		};

		return (
			<div className={`${className} visiting-card`}>
				<figure className="photo">
					<img src="http://wordpressmeetup.local/wp-content/uploads/2022/11/face.png" />
				</figure>
				<h3 class="profile-name">
					<RichText
						placeholder={__("Enter Profile Name", "blocks-demo")}
						value={profileName}
						onChange={updateprofileName}
					/>
				</h3>
				<div className="description">
					<p>{__("John doe is an expert WordPress developer who specialize in custom themes and plugins.", "blocks-demo")}</p>
				</div>
			</div>
		);
	},
	save: props => {
		const {
			className,
			attributes: { profileName },
		} = props;

		return (
			<div className={`${className} visiting-card`}>
				<figure className="photo">
					<img src="http://wordpressmeetup.local/wp-content/uploads/2022/11/face.png" />
				</figure>
				<h3 class="profile-name">
					<RichText.Content value={profileName} />
				</h3>
				<div className="description">
					<p>{__("John doe is an expert WordPress developer who specialize in custom themes and plugins.", "blocks-demo")}</p>
				</div>
			</div>
		);
	}
});
