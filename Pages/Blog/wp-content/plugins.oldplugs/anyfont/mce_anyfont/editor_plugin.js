(function() {

    tinymce.create('tinymce.plugins.AnyFontPlugin', {
		/**
		 * Initializes the plugin
		 *
		 * @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
		 * @param {string} url Absolute URL to where the plugin is located.
		 */
		init : function(ed, url) {
// 			console.log(ed);
			// Register the command so that it can be invoked by using tinyMCE.activeEditor.execCommand('mceExample');
			AF_Data.url = url;

			ed.addCommand('mceAnyFont', function() {
				var title = document.getElementById('title').value;
				ed.windowManager.open({
					file : url + '/dialog.php?text='+escape(ed.selection.getContent({format : 'text'})),
					width : 400,
					height : 145,
					inline : 1
				}, {
					plugin_url : url,
					postTitle: title
				});
			});

			// Register button
// 			ed.addButton('anyfont', {
// 				title : "Insert text using AnyFont styles",
// 				cmd : 'mceAnyFont',
// 				image : url + '/insert-text.gif'
// 			});

			ed.addCommand('mcesetFont', function(v) {
				tinyMCE.activeEditor.contentDocument.head.innerHTML+='<link rel="stylesheet" href="/af-css/'+v+'.css" type="text/css" media="all">';
				tinyMCE.execCommand('mceInsertContent', false, '<span class="anyfont '+AF_Data.fontlist[v].class_name.gsub(" ", "_")+'">'+tinyMCE.activeEditor.selection.getContent({format : 'text'})+'</span>');
				
			});

// 			ed.addButton('fontlist', {
// 				title : "Change highlighted text to selected font.",
// 				cmd : 'mceAnyFontList',
// 				image : url + '/insert-text.gif'
// 			});

			// Add a node change handler, selects the button in the UI when a image is selected
// 			ed.onNodeChange.add(function(ed, cm, n) {
// 				cm.setActive('anyfont', n.nodeName == 'IMG');
// 			});
		},

		createControl: function(n, cm) {
			
			switch (n) {
// 				case 'fontlist':
// 					AF_Data.listbox = cm.createListBox('fontlist', {
// 						title : 'Select font',
// 						onselect : function(v) {
// 							tinyMCE.activeEditor.contentDocument.head.innerHTML+='<link rel="stylesheet" href="/af-css/'+v+'.css" type="text/css" media="all">';
// 							tinyMCE.execCommand('mceInsertContent', false, '<span class="'+v.gsub(" ", "_")+'">'+tinyMCE.activeEditor.selection.getContent({format : 'text'})+'</span>');
// // 							tinyMCE.activeEditor.windowManager.alert('Text selected:' +$('content_fontlist_text').innerHTML );
// 						}
// // 						onChange: function(v){
// // 							console.log("change1: "+v);
// // 						}
// 					});
// 					var fontarray = Object.keys(AF_Data.fontlist);
// 					fontarray.each(function(font){
// 						if(AF_Data.fontlist[font].webfont == 'Yes'){
// 							AF_Data.listbox.add(AF_Data.fontlist[font].preview_img, AF_Data.fontlist[font].name);
// 						}
// 					});
// 					AF_Data.listbox.onChange.add(function(){
// 							tinyMCE.activeEditor.windowManager.alert('Change detected:');
// 						})
// // 					mlb.OnRender = function(e){
// // 
// // 						console.log(e);
// // 					}
// 					
// 					// Add some values to the list box
// // 					mlb.add('Some item 1', 'val1');
// // 					mlb.add('some item 2', 'val2');
// // 					mlb.add('some item 3', 'val3');
// 
// 					// Return the new listbox instance
// 					return AF_Data.listbox;
				case 'anyfont':
					AF_Data.anyfont = cm.createSplitButton('anyfont', {
						title : 'Select font',
						image : AF_Data.url + '/insert-text.gif',
						onclick : function() {
							tinyMCE.execCommand('mceAnyFont');
						},
						icons:true
					});

                AF_Data.anyfont.onRenderMenu.add(function(c, m) {
					var fontarray = Object.keys(AF_Data.fontlist);
					fontarray.each(function(font){
						if(AF_Data.fontlist[font].webfont == 'Yes'){
							m.add({
								icon:AF_Data.fontlist[font].class_name,
								title:font,//AF_Data.fontlist[font].image,
								onclick : function() {
									tinyMCE.execCommand('mcesetFont', font);
								}
							});
						}
					});
//                     m.add({title : 'Some title', 'class' : 'mceMenuItemTitle'}).setDisabled(1);
// 
//                     m.add({title : 'Some item 1', onclick : function() {
//                         tinyMCE.activeEditor.windowManager.alert('Some  item 1 was clicked.');
//                     }});
// 
//                     m.add({title : 'Some item 2', onclick : function() {
//                         tinyMCE.activeEditor.windowManager.alert('Some  item 2 was clicked.');
//                     }});
                });

                // Return the new splitbutton instance
                return AF_Data.anyfont;
//         }
					
// 				case 'stylelist':
// 					var mlb = cm.createListBox('stylelist', {
// 						title : 'Select Style',
// 						onselect : function(v) {
// 							tinyMCE.activeEditor.windowManager.alert('Value selected:' + v);
// 						}
// 					});
// // 					console.log(mlb);
// 					// Add some values to the list box
// 					mlb.add('Some item 1', 'val1');
// 					mlb.add('some item 2', 'val2');
// 					mlb.add('some item 3', 'val3');
// 
// 					// Return the new listbox instance
// 					return mlb;
			}

			return null;
		},
		/**
		 * @return {Object} Name/value array containing information about the plugin.
		 */
		getInfo : function() {
			return {
				longname : 'AnyFont plugin',
				author : 'Ryan Peel',
				authorurl : 'http://2amlife.com',
				infourl : 'http://2amlife.com/projects/anyfont',
				version : "1.0"
			};
		}
	});

	tinymce.PluginManager.add('anyfont', tinymce.plugins.AnyFontPlugin);
})();
