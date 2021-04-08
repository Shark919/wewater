import { gql } from '@apollo/client/core';
import commentOutlined from '@iconify/icons-ant-design/comment-outlined';
import { Icon } from '@iconify/react';
import { graphql } from 'gatsby';
import React from 'react';
import { Button, Container, Grid, GridColumn } from 'semantic-ui-react';
import CommentForm from '../components/Comments/comment-form';
import CommentList from '../components/Comments/comment-list';
import HeaderOverlayBlogPost from '../components/HeaderOverlay/header-overlay-blog-post';
import Layout from '../components/Layout/Layout';
import SidebarWidget from '../components/Sidebar/sidebar';
import { useTranslationHOC } from '../components/useTranslationHOC/useTranslationHOC';
import SEO from './../components/seo';
import './blog-post.less';

const commentQuery: any = gql`
    query($postId: ID!) {
        comments(where: { contentId: $postId, contentStatus: PUBLISH }) {
            edges {
                node {
                    id
                    content
                    date
                    author {
                        node {
                            name
                        }
                    }
                }
            }
        }
    }
`;


function BlogPostTemplate({ data, t }) {
    const post = data.allWpPost.edges[0].node;
    const sources = post.featuredImage.node.localFile.childImageSharp.gatsbyImageData;
    return (
        <Layout>

            <>
                <SEO description={post.title} title={post.title} />
                <HeaderOverlayBlogPost
                    sources={sources}
                    content={<OverlayContent post={post} inverted={true} />}
                />
                <Container>
                    <div className="blog-content-sections">
                        <Grid columns="2" stackable centered>
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
            </>
        </Layout>
    );
}

export default useTranslationHOC(BlogPostTemplate);

const OverlayContent = ({ post, inverted }) => {
    const colors = ['color-primary', 'color-secondary', 'color-tertiary'];
    const wordcount = post?.content.split(' ').length;
    const readTime = Math.round(wordcount / 200);

    return (
        <>
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
            <div>
                <h1
                    className={`text-shadow header-overlay-headline ${inverted ? 'header-overlay-headline-inverted' : null
                        }`}
                >
                    {post.title}
                </h1>
                <div className="blog-post-author-box">
                    <p>Von {post.author.node.name}</p>
                    <div className="blog-post-dot"></div>
                    <p>{post.date}</p>
                    <div className="blog-post-dot"></div>
                    <p>{readTime} Min read</p>
                </div>
                <div className="blog-post-social-box">
                    <span>
                        <Icon icon={commentOutlined} />
                        <p>
                            {post?.commentCount === null ? 0 : post?.commentCount}
                        </p>
                    </span>
                    <div className="blog-post-social-buttons">
                        <a href={'https://facebook.com/sharer/sharer.php?u=' + location?.href} target="_blank" rel="noopener">
                            <Button className="blog-button-social" color='facebook' icon='facebook' size="medium" />
                        </a>
                        <a href={'https://twitter.com/intent/tweet/?url=' + location?.href} target="_blank" rel="noopener">
                            <Button className="blog-button-social" color='twitter' icon='twitter' size="medium" />
                        </a>
                        <a href={'https://www.linkedin.com/shareArticle?mini=true&amp;url=' + location?.href} target="_blank" rel="noopener">
                            <Button className="blog-button-social" color='linkedin' icon='linkedin' size="medium" />
                        </a>
                        <a href={'https://pinterest.com/pin/create/button/?url=' + location?.href} target="_blank" rel="noopener">
                            <Button className="blog-button-social" color='pinterest' icon='pinterest' size="medium" />
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export const pageQuery = graphql`
    query BlogPostByPath($slug: String!) {
        allWpPost(filter: { slug: { eq: $slug } }) {
            ...GetBlogposts
        }
    }
`;
