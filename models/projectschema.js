var mongoose    =   require("mongoose");
var mongoSchema =   mongoose.Schema;
var projectSchema  = {
    "proj_name" : String,
    "proj_created" : String,
    "proj_updated" : String,
	"proj_posts" : [
	{
      		"post_media" : [
      		{
      			"post_media_url" : String,
      			"post_media_type" : String
      		}
      		],
      		"post_likes" : [{
      			"post_usr_like_id" : String
      		}],
      		"post_story" : String,
      		"post_created" : String,
      		"post_tags" : [{
      		
      		      "usr_id" : String
      		}],
      		"post_usr_id" : String,
      		
      		"post_comments" : [
      		{
      			"post_usr_id" : String,
      			"post_comment" : String
    		}
    ]
    }], 
    "proj_creator" : String,
    "proj_desc" : String,
    "proj_category" : String,
    "proj_team_members" : [
    {
    	"proj_usr_id" : String
    }
    ],
    "proj_cover_img" : String,
    "proj_privacy" : String
};
module.exports = mongoose.model('projects',projectSchema);;
