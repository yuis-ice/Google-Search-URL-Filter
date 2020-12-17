// ==UserScript==
// @name         Google Search URL Filter
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  try to take over the world!
// @author       yuis-ice
// @match        http://www.google.com/*
// @match        http://www.google.co.jp/*
// @match        https://www.google.com/*
// @match        https://www.google.co.jp/*
// @grant        none
// ==/UserScript==


(async function(){

  console.log("load, ");
  await import("https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js")

	$(document).ready(function(){
		console.log("load,,");

		(async function(){
			console.time('Google Search URL Filter');
			const sleep = m => new Promise(r => setTimeout(r, m))

			elem_searchbar = await document.querySelector("#tsf > div:nth-child(2) > div > div:nth-child(2)") ;
			clone = await elem_searchbar.cloneNode(true) ; // maybe need await for cloneNode
			clone02 = await elem_searchbar.cloneNode(true) ;
			elem_resultarea = await document.querySelector("div#res") ;
			await elem_resultarea.before(clone) ;
			await elem_resultarea.before(clone02) ;
			clone.querySelector("input").value = "" ;
			clone02.querySelector("input").value = "" ;
			await clone.querySelector('.clear-button').remove() ;
			await clone02.querySelector('.clear-button').remove() ;
			await clone.querySelector('div[aria-label="Search by voice"]').remove() ;
			await clone02.querySelector('div[aria-label="Search by voice"]').remove() ;
			await clone.querySelector('button[aria-label="Google Search"]').remove() ;
			await clone02.querySelector('button[aria-label="Google Search"]').remove() ;
			clone.querySelector("input").placeholder = "Type URL match text here" ;
			clone02.querySelector("input").placeholder = "Tags here e.g. not; tld; " ;

			[clone, clone02].forEach(item => {
				item.querySelector("input").addEventListener('input', async function(e){
					filter = clone.querySelector("input").value ;
					tag = clone02.querySelector("input").value ;
					console.log( this.value, filter, tag, new RegExp(filter,"g")) ;

					if ( tag == "not" ){
						console.log("not") ;
						[].slice.call( document.querySelectorAll("div#search div.g > div") )
						.forEach(a => a.hidden = false ) ;
						[].slice.call( document.querySelectorAll("div#search div.g > div") )
						.filter(a => ! ( a.querySelector("div#search div div.yuRUbf > a") && ! a.querySelector("div#search div div.yuRUbf > a").href.match(new RegExp(filter,"g")) ) )
						.forEach(a => console.log( a.hidden = true ) ) ;
					} else if ( tag == "tld" ){
						console.log("tld") ;
						[].slice.call( document.querySelectorAll("div#search div.g > div") )
						.forEach(a => a.hidden = false ) ;
						[].slice.call( document.querySelectorAll("div#search div.g > div") )
						.filter(a => ! ( a.querySelector("div#search div div.yuRUbf > a") && ! a.querySelector("div#search div div.yuRUbf > a").href.match(/https?:\/\/(.*?)(\/)?$/)[1].includes("/") ) )
						.forEach(a => console.log( a.hidden = true ) ) ;
					} else {
						[].slice.call( document.querySelectorAll("div#search div.g > div") )
						.forEach(a => a.hidden = false ) ;
						[].slice.call( document.querySelectorAll("div#search div.g > div") )
						.filter(a => ! ( a.querySelector("div#search div div.yuRUbf > a") && a.querySelector("div#search div div.yuRUbf > a").href.match(new RegExp(filter,"g")) ) )
						.forEach(a => console.log( a.hidden = true ) ) ;
					}
				});
			})

			console.timeEnd('Google Search URL Filter');
		})();

	});

	$(window).on('load', function() {
  	console.log("load,,,");
	});

  document.addEventListener('DOMContentLoaded', (event) => {
  	console.log("load,,,,");
  });

})();
