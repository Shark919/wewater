import { Link } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import React from 'react';
import { Card, CardContent, CardMeta } from 'semantic-ui-react';
import './projekt-card.less';

interface Props {
    post: Post;
}

type Post = {
    excerpt: any;
    title: string;
    date: string;
    uri: string;
    slug: string;
    tags: {
        nodes: any[];
    };
    featuredImage: {
        node: {
            localFile: {
                childImageSharp: any;
            }
        }
    };
};

export default function ProjektCard({ post }: Props) {
    return (
        <Link to={post.slug}>
            <Card className="rounded hover-animate shadow" fluid centered>
                <div></div>
                <BackgroundImage
                    Tag="div"
                    className="rounded-corners-top dark-overlay-blog rtt-areas-card-background"
                    fluid={post.featuredImage.node.localFile.childImageSharp.fluid}
                >
                    <div className="rtt-areas-card-background-text-wrapper">
                        <h3 className="rtt-areas-card-background-text">{post.title}</h3>
                    </div>
                </BackgroundImage>
                <CardContent className="blog-post-card-content">
                    <Card.Description>{post.excerpt}</Card.Description>
                </CardContent>
                <CardContent extra>
                    <CardMeta>{post.date}</CardMeta>
                </CardContent>
            </Card>
        </Link>
    );
}