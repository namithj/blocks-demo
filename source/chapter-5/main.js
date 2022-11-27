/**
 * Chapter 5.
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, MediaUploadCheck } = wp.editor;
const { Button } = wp.components;

registerBlockType("blocks-demo/visiting-card", {
	title: __("Visiting Card", "blocks-demo"),
	icon: "admin-users",
	category: "blocks-demo",
	attributes: {
		profileName: {
			type: "string",
			source: "html",
			selector: ".profile-name"
		},
		profileImage: {
			type: "string",
			source: "attribute",
			selector: ".photo img",
			attribute: "src",
			default: 'http://wordpressmeetup.local/wp-content/uploads/2022/11/face.png'
		},
		profileDescription: {
			type: "array",
			source: "children",
			multiline: "p",
			selector: ".description"
		},
	},
	edit: props => {
		const {
			className,
			attributes: { profileName, profileImage, profileDescription },
			setAttributes
		} = props;

		const updateprofileName = newProfileName => {
			setAttributes({ profileName: newProfileName });
		};

		const updateprofileImage = newProfileImage => {
			setAttributes({ profileImage: newProfileImage.url });
		};

		const updateprofileDescription = newProfileDescription => {
			setAttributes({ profileDescription: newProfileDescription });
		};

		return (
			<div className={`${className} visiting-card`}>
				<figure className="photo">
					<img src={profileImage} />
					<MediaUploadCheck>
						<MediaUpload
							onSelect={updateprofileImage}
							type="image"
							value={profileImage}
							render={({ open }) => (
								<Button onClick={open}>Select Profile Image</Button>
							)}
						/>
					</MediaUploadCheck>
				</figure>
				<h3 class="profile-name">
					<RichText
						placeholder={__("Enter Profile Name", "blocks-demo")}
						value={profileName}
						onChange={updateprofileName}
					/>
				</h3>
				<div className="description">
					<RichText
						multiline="p"
						placeholder={__("Enter Profile Description", "blocks-demo")}
						onChange={updateprofileDescription}
						value={profileDescription}
					/>
				</div>
			</div>
		);
	},
	save: props => {
		const {
			className,
			attributes: { profileName, profileImage, profileDescription },
		} = props;

		return (
			<div className={`${className} visiting-card`}>
				<figure className="photo">
					<img src={profileImage} />
				</figure>
				<h3 class="profile-name">
					<RichText.Content value={profileName} />
				</h3>
				<div className="description">
					<RichText.Content
						multiline="p"
						value={profileDescription}
					/>
				</div>
			</div>
		);
	}
});
