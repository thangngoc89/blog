import React, { Component } from "react"
import site from "../../config.yml"
import IconRss from "react-icons/fa/rss-square"
import IconEnvelope from "react-icons/fa/envelope"
import IconGithub from "react-icons/fa/github"

export default class NavIcons extends Component {
  render() {
    return (
      <div>
        <li>
          <a
            href="/feed.xml"
            title={ site.theme_settings.str_rss_follow }
          >
            <IconRss />
          </a>
        </li>
        <li>
          <a
            href={ `mailto:${ site.theme_settings.email_address }` }
            title={ site.theme_settings.str_email }
          >
            <IconEnvelope />
          </a>
        </li>
        <li>
          <a
            href={ `https://github.com/${ site.theme_settings.github }` }
            title={ `${ site.theme_settings.str_follow_on } GitHub` }
          >
            <IconGithub />
          </a>
        </li>

        {/*
        {% if site.theme_settings.twitter %}
        <li>
        	<a href="https://twitter.com/{{ site.theme_settings.twitter }}" title="{{ site.theme_settings.str_follow_on }} Twitter">
        		<i class="fa fa-fw fa-twitter"></i>
        	</a>
        </li>
        {% endif %}
        */}
        </div>
    )
  }
}
