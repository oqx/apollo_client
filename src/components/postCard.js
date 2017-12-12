import React from 'react'

export default function PostCard(props) {

	const { author,
					id,
					image,
					isFat,
					is_self,
					is_video,
					num_comments,
					isFetching,
					score,
					selfHTML,
					title } = props

	return (
		<li className={"post-card " + (!!isFat ? 'post-card--horizontal ' : '') + (isFetching ? 'post-card\@loading loader--static' : '')} key={id}>
			{(image) && (<div className="post-card@imaging">
				<img src={image ? image : null} className="post-card@imaging__img" />
			</div>)}
			<h4 className="post-card__title" aria-label="Post Title">{title}</h4>
			<div className="post-card__upvotes" aria-label="Upvote Count">{score}</div>
			<div className="post-card@post">
				{(selfHTML) &&<p id="post-body-2"
					 className="post-card@post__body post-card@post__body--truncate"
					 dangerouslySetInnerHTML={{ __html: selfHTML }}></p>}
			</div>
			<footer className="post-card@footer">
				{(selfHTML) &&<div className="post-card@footer__col">
					<button className="post-card__read-more">Read More</button>
				</div>}
				<div className="post-card@footer__col">
					<div className="post-card__date"><date>Feb 23rd, 2017</date></div>
					<div className="post-card__author">Posted by <a
							 href={"https://www.reddit.com/user/" + (author)}
							 target="_blank"
							 rel="noopener">{author}</a></div>
				</div>
			</footer>
		</li>

	)
}
