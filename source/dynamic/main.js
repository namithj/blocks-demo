/**
 * Dynamic.
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType("blocks-demo/recent-posts", {
	title: __("Recent Posts", "blocks-demo"),
	icon: "format-aside",
	category: "blocks-demo",
	supports: {
		html: false
	},
	edit() {
		return (
			<ul>
				<li><a href="#">{__("Post Title", "blocks-demo")}</a></li>
				<li><a href="#">{__("Post Title", "blocks-demo")}</a></li>
				<li><a href="#">{__("Post Title", "blocks-demo")}</a></li>
				<li><a href="#">{__("Post Title", "blocks-demo")}</a></li>
				<li><a href="#">{__("Post Title", "blocks-demo")}</a></li>
			</ul>
		);
	},
	save() {
		return null;
	}
});
