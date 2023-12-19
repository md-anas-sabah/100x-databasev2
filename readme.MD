<h1>100x Schema Design.</h1>

<b>User - </b>(Table name: Users)

<li>user_id: bigint serial (Primary Key) --//Serial means auto increment value.</li> 
<li>username: string unique 50 char max</li>
<li>email: string</li>
<li>email_verified_at: timestamp nullable</li>
<li>display_name: string 50 character max</li>
<li>bio: text</li>
<li>password: string 225 char max (Not null)</li>
<li>profile_picture_url: string nullable</li>
<li>header_picture_url: string nullable</li>
<li>registration_date: timestamp nullable</li>
<li>date_of_birth: timestamp nullable --above 13 year</li>
<li>website: string 100char max(nullable)</li>


<b>Tweet/Post - </b>(Table name: Posts)

<li>post_id: bigint serial (Primary Key)</li>
<li>content: text (280 characters)</li>
<li>posted_at: timestamp</li>
<li>deleted_at: timestamp</li>
<li>user_id: bigint (Foreign Key)</li>
<li>repost_id: bigint nullable (Foreign Key)</li>
<li>post_type: enum ['post', 'repost' , 'reply'] (Not null) defaultValue-"Post"</li>

<b>Like - </b>(Table name: Likes)

<li>like_id: bigint serial (Primary Key)</li>
<li>user_id: bigint (Foreign Key)</li>
<li>post_id: bigint (Foreign Key)</li>
<li>liked_at: timestamp nullable</li>

<b>Following - </b>(Table name: Followings)

<li>following_id: bigint serial (Primary key)</li>
<li>user_id: bigint (Foreign key)</li>
<li>following_at: timestamp</li>

<b>Follower - </b>(Table name: Followers)

<li>follower_id: bigint serial (Primary Key)</li>
<li>user_id: bigint (Foreign Key)</li>
<li>following_at: timestamp</li>

<b>Reply - </b>(Table name: Replies)

<li>reply_id: bigint serial (Primary Key)</li>
<li>original_post_id: bigint (Foreign Key references Posts)</li>
<li>content: text (280 characters)</li>
<li>posted_at: timestamp</li>
<li>user_id: bigint (Foreign Key)</li>
