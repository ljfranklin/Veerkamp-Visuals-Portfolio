(function(a){var c=function(b,c){a.each(c,function(a,c){b=b.replace(RegExp("{{ *"+a+" *}}"),c)});return b};a(function(){var b=a("#wp_rp_statistics_wrap"),g=a("#wp_rp_dashboard_url").val(),e=a("#wp_rp_blog_id").val(),f=a("#wp_rp_auth_key").val();update_interval=req_timeout=null;update_interval_sec=2E3;update_interval_error_sec=3E4;updating=!1;ul=null;set_update_interval=function(a){a||(a=update_interval_sec);clearInterval(update_interval);0<a&&(update_interval=setInterval(update_dashboard,a))};display_error=
function(d){var h=a("#wp_rp_statistics_wrap");d||h.find(".unavailable").slideDown();set_update_interval(update_interval_error_sec);updating=!1};create_dashboard=function(){ul=a('<ul class="statistics" />');b.find(".unavailable").slideUp();ul.append(c('<li class="{{class}}"><h4>{{ title}}<span>{{range}}</span></h4><p class="num"></p><div class="overlay"><p>{{description}}</p></div></li>',{"class":"ctr",title:"click-through rate",description:"Number of clicks on a Related Post divided by the number of times the post was shown to readers. Tip: Using thumbnails will generally rise Click-through Rates.",
range:"last 30 days"}));ul.append(c('<li class="{{class}}"><h4>{{ title}}<span>{{range}}</span></h4><p class="num"></p><div class="overlay"><p>{{description}}</p></div></li>',{"class":"pageviews",title:"page views",description:"Number of times the page (usually post) was loaded to readers.",range:"last 30 days"}));ul.append(c('<li class="{{class}}"><h4>{{ title}}<span>{{range}}</span></h4><p class="num"></p><div class="overlay"><p>{{description}}</p></div></li>',{"class":"clicks",title:"clicks",description:"Number of times a reader has clicked on one of the Related Posts.",
range:"last 30 days"}));ul.hide();b.append(ul);ul.slideDown()};update_dashboard=function(d){updating||(updating=!0,req_timeout=setTimeout(function(){display_error(!d)},2E3),a.getJSON(g+"pageviews/?callback=?",{blog_id:e,auth_key:f},function(a){clearTimeout(req_timeout);!a||"ok"!==a.status||!a.data?display_error(!d):(ul||create_dashboard(),set_update_interval(a.data.update_interval),ul.find(".ctr .num").html(a.data.ctr+"%"),ul.find(".pageviews .num").html(a.data.pageviews),ul.find(".clicks .num").html(a.data.clicks),
updating=!1)}))};e&&f&&(update_dashboard(!0),update_interval=setInterval(update_dashboard,2E3));a("#wp_rp_turn_on_statistics a").click(function(d){d.preventDefault();var d=a("#wp_rp_static_base_url").val(),c=!1,b=function(){c||(a("#wp_rp_settings_form").submit(),c=!0)};a("#wp_rp_ctr_dashboard_enabled, #wp_rp_display_thumbnail, #wp_rp_enable_themes").prop("checked",!0);a("<img />").load(b).error(b).attr("src",d+"stats.gif?action=turn_on_button&nc="+(new Date).getTime());setTimeout(b,1E3)});a(".wp_rp_notification .close").on("click",
function(b){a.ajax({url:a(this).attr("href"),data:{noredirect:!0}});a(this).parent().slideUp(function(){a(this).remove()});b.preventDefault()})})})(jQuery);
