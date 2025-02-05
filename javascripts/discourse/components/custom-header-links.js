import Component from "@glimmer/component";
import { dasherize } from "@ember/string";

export default class CustomHeaderLinksWithSubmenu extends Component {
  get shouldShow() {
    return settings.custom_header_links_with_submenu?.length > 0;
  }

  get links() {
    return settings.custom_header_links_with_submenu.reduce((result, link) => {
      const linkText = link.text;
      const linkTitle = link.title;
      const linkHref = link.url;
      const target = link.target;
      const subLinks = link.subLinks || [];  // Fetch sublinks if available

      if (!linkText) {
        return result;
      }

      const linkClass = `${dasherize(linkText)}-custom-header-links`;

      const anchorAttributes = {
        title: linkTitle,
        href: linkHref,
        target: target === "self" ? "" : "_blank",
      };

      result.push({
        linkClass,
        anchorAttributes,
        linkText,
        subLinks, // Attach subLinks to the main link
      });

      return result;
    }, []);
  }
}
