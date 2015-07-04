var utils = {

	showLoadingIcon: function(){
		$("#loadingIcon").show();

	},

	hideLoadingIcon: function(){
		$("#loadingIcon").hide();
	
	},
	buildFeedInfo: function(data){
    	var self = this,
        container = $("#content"),
        msgs = data.messages,
        references = data.references,
        str = [];
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      		"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    	];
    	str.push("<div class='feed_main'>");
    	$.each(msgs, function(ind, msg){
        	var senderArrObj = $.grep(references, function(e){ return e.id == msg.sender_id; }),
        	senderName = (senderArrObj.length > 0) ? senderArrObj[0].full_name : "",
        	senderPicURL = (senderArrObj.length > 0) ? senderArrObj[0].mugshot_url : "",
        	msgCreatedDate = msg.created_at;
        	var todayDate = new Date();
        	var msgDate = new Date(msgCreatedDate);
        	if(todayDate.getDate() == msgDate.getDate() &&
            	todayDate.getMonth() == msgDate.getMonth() &&
            	todayDate.getFullYear() == msgDate.getFullYear()) {
          	msgCreatedDate = msgCreatedDate.split(' ')[1];
      	  	msgCreatedDate = msgCreatedDate.split(':')[0]+":"+msgCreatedDate.split(':')[1];
        	}
        	else {
          	msgCreatedDate = monthNames[msgDate.getMonth()] + " " + msgDate.getDate();
        	}
        	str.push("<div class='msg_main'>");
        	str.push("<div class='msg_sender_pic'><a class='senderLinkAnc' href='javascript:{}'><img src='"+senderPicURL+"'/></a></div>");
        	str.push("<div class='msg_details_main'>");
        	str.push("<div class='msg_head'>");
        	str.push("<div class='msg_sender_name'><a class='senderLinkAnc' href='javascript:{}'>"+senderName+"</a></div>");
        	str.push("<div class='msg_date_time'>"+msgCreatedDate+"</div>");
        	str.push("</div>");
        	str.push("<div class='msg_body'>");
        	str.push(msg.body.plain);
        	str.push("</div>");
        	str.push("</div>");
        	str.push("</div>");
    	});
    	str.push("</div>");
    	container.empty().html(str.join(''));
    	container.off("click", ".feed_main a.senderLinkAnc").on("click", ".feed_main a.senderLinkAnc", function(){
        var profileObj = new Profile();
        profileObj.init();
    });
  },

}