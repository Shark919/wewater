import { graphql } from 'gatsby';
import React from 'react';
import { Container, Grid, GridColumn } from 'semantic-ui-react';
import CommentForm from '../components/Comments/comment-form';
import CommentList from '../components/Comments/comment-list';
import Layout from '../components/Layout/Layout';
import SidebarWidget from '../components/Sidebar/sidebar';
import { useTranslationHOC } from '../components/useTranslationHOC/useTranslationHOC';
import HeaderOverlayBlog from './../components/HeaderOverlay/header-overlay-blog';
import SEO from './../components/seo';
import './blog-post.less';


function BlogPostTemplate({ data, t }) {
    const post = data.allWpPost.edges[0].node;
    const sources = post.featuredImage.node.localFile.childImageSharp.gatsbyImageData;

    return (
        <Layout>
            <SEO description={post.title} title={post.title} />
            <HeaderOverlayBlog
                sources={sources}
                color="#000000"
                inverted={true}
                content={<OverlayContent post={post} inverted={true} />}
            />
            <Container>
                <div className="blog-content-sections">
                    <Grid columns="2" stackable centered>
                        {/*                         <GridColumn width={2} className="blog-social-col">
                            <Button className="blog-button-social" color='facebook' icon='facebook' size="large" />
                            <Button className="blog-button-social" color='twitter' icon='twitter' size="large" />
                            <Button className="blog-button-social" color='linkedin' icon='linkedin' size="large" />
                            <Button className="blog-button-social" color='google plus' icon='google plus' size="large" />
                        </GridColumn> */}
                        <GridColumn width={10}>
                            <section className="blog-post">
                                <article dangerouslySetInnerHTML={{ __html: post.content }}></article>
                            </section>
                            <section className="author-section">
                                <hr />
                                <div className="author-card">
                                    <div className="author-img">
                                        <img src={post.author.node.avatar.url} width="90" height="90" alt="Avatar" className="author-avatar" />
                                    </div>
                                    <div className="author-content">
                                        <h3>{post.author.node.name}</h3>
                                        <h6>ÜBER DEN AUTOR</h6>
                                        <p>{post.author.node.description}</p>
                                    </div>
                                </div>
                                <hr />
                            </section>
                            <section>
                                <CommentList postId={post.databaseId} />
                                <CommentForm postId={post.databaseId} />
                            </section>
                        </GridColumn>
                        <GridColumn width={4}>
                            <SidebarWidget></SidebarWidget>
                        </GridColumn>
                    </Grid>

                </div>
            </Container>
        </Layout>
    );
}

export default useTranslationHOC(BlogPostTemplate);

const OverlayContent = ({ post, inverted }) => {
    const colors = ['color-primary', 'color-secondary', 'color-tertiary'];
    return (
        <div>
            <div className="blog-post-tag-label-group">
                {post.categories.nodes.slice(0, 3).map((tag, index) => {
                    return (
                        <div
                            key={"tag-" + index + post.uri}
                            className="blog-post-tag-label blog-post-tag-label-overlay"
                        >
                            <span className={`label-dot ` + colors[index]}></span>
                            <span className="label-text"> {tag?.name}</span>
                        </div>
                    );
                })}
            </div>
            <h1
                className={`text-shadow header-overlay-headline ${inverted ? 'header-overlay-headline-inverted' : null
                    }`}
            >
                {post.title}
            </h1>
            <div className="blog-post-author-box">
                <p>Von {post.author.node.name} am {post.date}</p>
            </div>
        </div>
    );
};

export const pageQuery = graphql`
    query BlogPostByPath($slug: String!) {
        allWpPost(filter: { slug: { eq: $slug } }) {
            ...GetBlogposts
        }
    }
`;
