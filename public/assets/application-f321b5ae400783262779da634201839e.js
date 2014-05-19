/*!
 * jQuery JavaScript Library v1.11.0
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-01-23T21:02Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var trim = "".trim;

var support = {};



var
	version = "1.11.0",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return a 'clean' array
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return just the object
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return obj - parseFloat( obj ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Use native String.trim function wherever possible
	trim: trim && !trim.call("\uFEFF\xA0") ?
		function( text ) {
			return text == null ?
				"" :
				trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.16
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-01-13
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	compile,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	// Prefer arguments quoted,
	//   then not containing pseudos/brackets,
	//   then attribute selectors/non-parenthetical expressions,
	//   then anything else
	// These preferences are here to reduce the number of selectors
	//   needing tokenize in the PSEUDO preFilter
	pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select t=''><option selected=''></option></select>";

			// Support: IE8, Opera 10-12
			// Nothing should be selected when empty strings follow ^= or $= or *=
			if ( div.querySelectorAll("[t^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [elem] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[5] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] && match[4] !== undefined ) {
				match[2] = match[4];

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

function tokenize( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
}

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !group ) {
			group = tokenize( selector );
		}
		i = group.length;
		while ( i-- ) {
			cached = matcherFromTokens( group[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	}
	return cached;
};

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function select( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		match = tokenize( selector );

	if ( !seed ) {
		// Try to minimize operations if there is only one group
		if ( match.length === 1 ) {

			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;
				}
				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}
	}

	// Compile and execute a filtering function
	// Provide `match` to avoid retokenization if we modified the selector above
	compile( selector, match )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
}

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.trigger ) {
			jQuery( document ).trigger("ready").off("ready");
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

jQuery(function() {
	// We need to execute this one support test ASAP because we need to know
	// if body.style.zoom needs to be set.

	var container, div,
		body = document.getElementsByTagName("body")[0];

	if ( !body ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

	div = document.createElement( "div" );
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "border:0;margin:0;width:1px;padding:1px;display:inline;zoom:1";

		if ( (support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 )) ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );

	// Null elements to avoid leaks in IE
	container = div = null;
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {
						name = attrs[i].name;

						if ( name.indexOf("data-") === 0 ) {
							name = jQuery.camelCase( name.slice(5) );

							dataAttr( elem, name, data[ name ] );
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = document.createElement("div"),
		input = document.createElement("input");

	// Setup
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	fragment = div = input = null;
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Even when returnValue equals to undefined Firefox will still show alert
				if ( event.result !== undefined ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined && (
				// Support: IE < 9
				src.returnValue === false ||
				// Support: Android < 4.0
				src.getPreventDefault && src.getPreventDefault() ) ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			window.getDefaultComputedStyle( elem[ 0 ] ).display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var a, shrinkWrapBlocksVal,
		div = document.createElement( "div" ),
		divReset =
			"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;" +
			"display:block;padding:0;margin:0;border:0";

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	a.style.cssText = "float:left;opacity:.5";

	// Make sure that element opacity exists
	// (IE uses filter instead)
	// Use a regex to work around a WebKit issue. See #5145
	support.opacity = /^0.5/.test( a.style.opacity );

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!a.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Null elements to avoid leaks in IE.
	a = div = null;

	support.shrinkWrapBlocks = function() {
		var body, container, div, containerStyles;

		if ( shrinkWrapBlocksVal == null ) {
			body = document.getElementsByTagName( "body" )[ 0 ];
			if ( !body ) {
				// Test fired too early or in an unsupported environment, exit.
				return;
			}

			containerStyles = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px";
			container = document.createElement( "div" );
			div = document.createElement( "div" );

			body.appendChild( container ).appendChild( div );

			// Will be changed later if needed.
			shrinkWrapBlocksVal = false;

			if ( typeof div.style.zoom !== strundefined ) {
				// Support: IE6
				// Check if elements with layout shrink-wrap their children
				div.style.cssText = divReset + ";width:1px;padding:1px;zoom:1";
				div.innerHTML = "<div></div>";
				div.firstChild.style.width = "5px";
				shrinkWrapBlocksVal = div.offsetWidth !== 3;
			}

			body.removeChild( container );

			// Null elements to avoid leaks in IE.
			body = container = div = null;
		}

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var a, reliableHiddenOffsetsVal, boxSizingVal, boxSizingReliableVal,
		pixelPositionVal, reliableMarginRightVal,
		div = document.createElement( "div" ),
		containerStyles = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px",
		divReset =
			"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;" +
			"display:block;padding:0;margin:0;border:0";

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	a.style.cssText = "float:left;opacity:.5";

	// Make sure that element opacity exists
	// (IE uses filter instead)
	// Use a regex to work around a WebKit issue. See #5145
	support.opacity = /^0.5/.test( a.style.opacity );

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!a.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Null elements to avoid leaks in IE.
	a = div = null;

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal != null ) {
				return reliableHiddenOffsetsVal;
			}

			var container, tds, isSupported,
				div = document.createElement( "div" ),
				body = document.getElementsByTagName( "body" )[ 0 ];

			if ( !body ) {
				// Return for frameset docs that don't have a body
				return;
			}

			// Setup
			div.setAttribute( "className", "t" );
			div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

			container = document.createElement( "div" );
			container.style.cssText = containerStyles;

			body.appendChild( container ).appendChild( div );

			// Support: IE8
			// Check if table cells still have offsetWidth/Height when they are set
			// to display:none and there are still other visible table cells in a
			// table row; if so, offsetWidth/Height are not reliable for use when
			// determining if an element has been hidden directly using
			// display:none (it is still safe to use offsets if a parent element is
			// hidden; don safety goggles and see bug #4512 for more information).
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			tds = div.getElementsByTagName( "td" );
			tds[ 0 ].style.cssText = "padding:0;margin:0;border:0;display:none";
			isSupported = ( tds[ 0 ].offsetHeight === 0 );

			tds[ 0 ].style.display = "";
			tds[ 1 ].style.display = "none";

			// Support: IE8
			// Check if empty table cells still have offsetWidth/Height
			reliableHiddenOffsetsVal = isSupported && ( tds[ 0 ].offsetHeight === 0 );

			body.removeChild( container );

			// Null elements to avoid leaks in IE.
			div = body = null;

			return reliableHiddenOffsetsVal;
		},

		boxSizing: function() {
			if ( boxSizingVal == null ) {
				computeStyleTests();
			}
			return boxSizingVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {
			var body, container, div, marginDiv;

			// Use window.getComputedStyle because jsdom on node.js will break without it.
			if ( reliableMarginRightVal == null && window.getComputedStyle ) {
				body = document.getElementsByTagName( "body" )[ 0 ];
				if ( !body ) {
					// Test fired too early or in an unsupported environment, exit.
					return;
				}

				container = document.createElement( "div" );
				div = document.createElement( "div" );
				container.style.cssText = containerStyles;

				body.appendChild( container ).appendChild( div );

				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// Fails in WebKit before Feb 2011 nightlies
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				marginDiv = div.appendChild( document.createElement( "div" ) );
				marginDiv.style.cssText = div.style.cssText = divReset;
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";

				reliableMarginRightVal =
					!parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );

				body.removeChild( container );
			}

			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		var container, div,
			body = document.getElementsByTagName( "body" )[ 0 ];

		if ( !body ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		container = document.createElement( "div" );
		div = document.createElement( "div" );
		container.style.cssText = containerStyles;

		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
				"position:absolute;display:block;padding:1px;border:1px;width:4px;" +
				"margin-top:1%;top:1%";

		// Workaround failing boxSizing test due to offsetWidth returning wrong value
		// with some non-1 values of body zoom, ticket #13543
		jQuery.swap( body, body.style.zoom != null ? { zoom: 1 } : {}, function() {
			boxSizingVal = div.offsetWidth === 4;
		});

		// Will be changed later if needed.
		boxSizingReliableVal = true;
		pixelPositionVal = false;
		reliableMarginRightVal = true;

		// Use window.getComputedStyle because jsdom on node.js will break without it.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";
		}

		body.removeChild( container );

		// Null elements to avoid leaks in IE.
		div = body = null;
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: 0,
		fontWeight: 400
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {

			if ( !values[ index ] ) {
				hidden = isHidden( elem );

				if ( display && display !== "none" || !hidden ) {
					jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
				}
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing() && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					// Support: Chrome, Safari
					// Setting style to blank string required to delete "style: x !important;"
					style[ name ] = "";
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return elem.offsetWidth === 0 && rdisplayswap.test( jQuery.css( elem, "display" ) ) ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing() && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, dDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );
		dDisplay = defaultDisplay( elem.nodeName );
		if ( display === "none" ) {
			display = dDisplay;
		}
		if ( display === "inline" &&
				jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || dDisplay === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var a, input, select, opt,
		div = document.createElement("div" );

	// Setup
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";

	// Null elements to avoid leaks in IE.
	a = input = select = opt = div = null;
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					jQuery.text( elem );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = url.slice( off, url.length );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.
if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.7.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with], button[data-disable-with], textarea[data-disable-with]',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with]',

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      var csrfToken = $('meta[name=csrf-token]').attr('content');
      var csrfParam = $('meta[name=csrf-param]').attr('content');
      $('form input[name="' + csrfParam + '"]').val(csrfToken);
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element.attr('href');
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, elCrossDomain, crossDomain, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        elCrossDomain = element.data('cross-domain');
        crossDomain = elCrossDomain === undefined ? null : elCrossDomain;
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            return rails.fire(element, 'ajax:beforeSend', [xhr, settings]);
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: crossDomain
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        var jqxhr = rails.ajax(options);
        element.trigger('ajax:send', jqxhr);
        return jqxhr;
      } else {
        return false;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = $('meta[name=csrf-token]').attr('content'),
        csrfParam = $('meta[name=csrf-param]').attr('content'),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      form.find(rails.disableSelector).each(function() {
        var element = $(this), method = element.is('button') ? 'html' : 'val';
        element.data('ujs:enable-with', element[method]());
        element[method](element.data('disable-with'));
        element.prop('disabled', true);
      });
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      form.find(rails.enableSelector).each(function() {
        var element = $(this), method = element.is('button') ? 'html' : 'val';
        if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
        element.prop('disabled', false);
      });
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        answer = rails.confirm(message);
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : input.val();
        // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
        if (!valueToCheck === !nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      element.data('ujs:enable-with', element.html()); // store enabled state
      element.html(element.data('disable-with')); // set to disabled state
      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }

  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (link.data('remote') !== undefined) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.error( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (link.data('method')) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);
      if (!rails.allowAction(button)) return rails.stopEverything(e);

      rails.handleRemote(button);
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = form.data('remote') !== undefined,
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector),
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (blankRequiredInputs && form.attr("novalidate") == undefined && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
        return rails.stopEverything(e);
      }

      if (remote) {
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:beforeSend.rails', function(event) {
      if (this == event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this == event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
(function() {
  var CSRFToken, Click, ComponentUrl, Link, browserCompatibleDocumentParser, browserIsntBuggy, browserSupportsCustomEvents, browserSupportsPushState, browserSupportsTurbolinks, bypassOnLoadPopstate, cacheCurrentPage, cacheSize, changePage, constrainPageCacheTo, createDocument, currentState, enableTransitionCache, executeScriptTags, extractTitleAndBody, fetch, fetchHistory, fetchReplacement, historyStateIsDefined, initializeTurbolinks, installDocumentReadyPageEventTriggers, installHistoryChangeHandler, installJqueryAjaxSuccessPageUpdateTrigger, loadedAssets, pageCache, pageChangePrevented, pagesCached, popCookie, processResponse, recallScrollPosition, referer, reflectNewUrl, reflectRedirectedUrl, rememberCurrentState, rememberCurrentUrl, rememberReferer, removeNoscriptTags, requestMethodIsSafe, resetScrollPosition, transitionCacheEnabled, transitionCacheFor, triggerEvent, visit, xhr, _ref,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  pageCache = {};

  cacheSize = 10;

  transitionCacheEnabled = false;

  currentState = null;

  loadedAssets = null;

  referer = null;

  createDocument = null;

  xhr = null;

  fetch = function(url) {
    var cachedPage;
    url = new ComponentUrl(url);
    rememberReferer();
    cacheCurrentPage();
    reflectNewUrl(url);
    if (transitionCacheEnabled && (cachedPage = transitionCacheFor(url.absolute))) {
      fetchHistory(cachedPage);
      return fetchReplacement(url);
    } else {
      return fetchReplacement(url, resetScrollPosition);
    }
  };

  transitionCacheFor = function(url) {
    var cachedPage;
    cachedPage = pageCache[url];
    if (cachedPage && !cachedPage.transitionCacheDisabled) {
      return cachedPage;
    }
  };

  enableTransitionCache = function(enable) {
    if (enable == null) {
      enable = true;
    }
    return transitionCacheEnabled = enable;
  };

  fetchReplacement = function(url, onLoadFunction) {
    if (onLoadFunction == null) {
      onLoadFunction = (function(_this) {
        return function() {};
      })(this);
    }
    triggerEvent('page:fetch', {
      url: url.absolute
    });
    if (xhr != null) {
      xhr.abort();
    }
    xhr = new XMLHttpRequest;
    xhr.open('GET', url.withoutHashForIE10compatibility(), true);
    xhr.setRequestHeader('Accept', 'text/html, application/xhtml+xml, application/xml');
    xhr.setRequestHeader('X-XHR-Referer', referer);
    xhr.onload = function() {
      var doc;
      triggerEvent('page:receive');
      if (doc = processResponse()) {
        changePage.apply(null, extractTitleAndBody(doc));
        reflectRedirectedUrl();
        onLoadFunction();
        return triggerEvent('page:load');
      } else {
        return document.location.href = url.absolute;
      }
    };
    xhr.onloadend = function() {
      return xhr = null;
    };
    xhr.onerror = function() {
      return document.location.href = url.absolute;
    };
    return xhr.send();
  };

  fetchHistory = function(cachedPage) {
    if (xhr != null) {
      xhr.abort();
    }
    changePage(cachedPage.title, cachedPage.body);
    recallScrollPosition(cachedPage);
    return triggerEvent('page:restore');
  };

  cacheCurrentPage = function() {
    var currentStateUrl;
    currentStateUrl = new ComponentUrl(currentState.url);
    pageCache[currentStateUrl.absolute] = {
      url: currentStateUrl.relative,
      body: document.body,
      title: document.title,
      positionY: window.pageYOffset,
      positionX: window.pageXOffset,
      cachedAt: new Date().getTime(),
      transitionCacheDisabled: document.querySelector('[data-no-transition-cache]') != null
    };
    return constrainPageCacheTo(cacheSize);
  };

  pagesCached = function(size) {
    if (size == null) {
      size = cacheSize;
    }
    if (/^[\d]+$/.test(size)) {
      return cacheSize = parseInt(size);
    }
  };

  constrainPageCacheTo = function(limit) {
    var cacheTimesRecentFirst, key, pageCacheKeys, _i, _len, _results;
    pageCacheKeys = Object.keys(pageCache);
    cacheTimesRecentFirst = pageCacheKeys.map(function(url) {
      return pageCache[url].cachedAt;
    }).sort(function(a, b) {
      return b - a;
    });
    _results = [];
    for (_i = 0, _len = pageCacheKeys.length; _i < _len; _i++) {
      key = pageCacheKeys[_i];
      if (!(pageCache[key].cachedAt <= cacheTimesRecentFirst[limit])) {
        continue;
      }
      triggerEvent('page:expire', pageCache[key]);
      _results.push(delete pageCache[key]);
    }
    return _results;
  };

  changePage = function(title, body, csrfToken, runScripts) {
    document.title = title;
    document.documentElement.replaceChild(body, document.body);
    if (csrfToken != null) {
      CSRFToken.update(csrfToken);
    }
    if (runScripts) {
      executeScriptTags();
    }
    currentState = window.history.state;
    triggerEvent('page:change');
    return triggerEvent('page:update');
  };

  executeScriptTags = function() {
    var attr, copy, nextSibling, parentNode, script, scripts, _i, _j, _len, _len1, _ref, _ref1;
    scripts = Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])'));
    for (_i = 0, _len = scripts.length; _i < _len; _i++) {
      script = scripts[_i];
      if (!((_ref = script.type) === '' || _ref === 'text/javascript')) {
        continue;
      }
      copy = document.createElement('script');
      _ref1 = script.attributes;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        attr = _ref1[_j];
        copy.setAttribute(attr.name, attr.value);
      }
      copy.appendChild(document.createTextNode(script.innerHTML));
      parentNode = script.parentNode, nextSibling = script.nextSibling;
      parentNode.removeChild(script);
      parentNode.insertBefore(copy, nextSibling);
    }
  };

  removeNoscriptTags = function(node) {
    node.innerHTML = node.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/ig, '');
    return node;
  };

  reflectNewUrl = function(url) {
    if ((url = new ComponentUrl(url)).absolute !== referer) {
      return window.history.pushState({
        turbolinks: true,
        url: url.absolute
      }, '', url.absolute);
    }
  };

  reflectRedirectedUrl = function() {
    var location, preservedHash;
    if (location = xhr.getResponseHeader('X-XHR-Redirected-To')) {
      location = new ComponentUrl(location);
      preservedHash = location.hasNoHash() ? document.location.hash : '';
      return window.history.replaceState(currentState, '', location.href + preservedHash);
    }
  };

  rememberReferer = function() {
    return referer = document.location.href;
  };

  rememberCurrentUrl = function() {
    return window.history.replaceState({
      turbolinks: true,
      url: document.location.href
    }, '', document.location.href);
  };

  rememberCurrentState = function() {
    return currentState = window.history.state;
  };

  recallScrollPosition = function(page) {
    return window.scrollTo(page.positionX, page.positionY);
  };

  resetScrollPosition = function() {
    if (document.location.hash) {
      return document.location.href = document.location.href;
    } else {
      return window.scrollTo(0, 0);
    }
  };

  popCookie = function(name) {
    var value, _ref;
    value = ((_ref = document.cookie.match(new RegExp(name + "=(\\w+)"))) != null ? _ref[1].toUpperCase() : void 0) || '';
    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/';
    return value;
  };

  triggerEvent = function(name, data) {
    var event;
    event = document.createEvent('Events');
    if (data) {
      event.data = data;
    }
    event.initEvent(name, true, true);
    return document.dispatchEvent(event);
  };

  pageChangePrevented = function() {
    return !triggerEvent('page:before-change');
  };

  processResponse = function() {
    var assetsChanged, clientOrServerError, doc, extractTrackAssets, intersection, validContent;
    clientOrServerError = function() {
      var _ref;
      return (400 <= (_ref = xhr.status) && _ref < 600);
    };
    validContent = function() {
      return xhr.getResponseHeader('Content-Type').match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/);
    };
    extractTrackAssets = function(doc) {
      var node, _i, _len, _ref, _results;
      _ref = doc.head.childNodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        if ((typeof node.getAttribute === "function" ? node.getAttribute('data-turbolinks-track') : void 0) != null) {
          _results.push(node.getAttribute('src') || node.getAttribute('href'));
        }
      }
      return _results;
    };
    assetsChanged = function(doc) {
      var fetchedAssets;
      loadedAssets || (loadedAssets = extractTrackAssets(document));
      fetchedAssets = extractTrackAssets(doc);
      return fetchedAssets.length !== loadedAssets.length || intersection(fetchedAssets, loadedAssets).length !== loadedAssets.length;
    };
    intersection = function(a, b) {
      var value, _i, _len, _ref, _results;
      if (a.length > b.length) {
        _ref = [b, a], a = _ref[0], b = _ref[1];
      }
      _results = [];
      for (_i = 0, _len = a.length; _i < _len; _i++) {
        value = a[_i];
        if (__indexOf.call(b, value) >= 0) {
          _results.push(value);
        }
      }
      return _results;
    };
    if (!clientOrServerError() && validContent()) {
      doc = createDocument(xhr.responseText);
      if (doc && !assetsChanged(doc)) {
        return doc;
      }
    }
  };

  extractTitleAndBody = function(doc) {
    var title;
    title = doc.querySelector('title');
    return [title != null ? title.textContent : void 0, removeNoscriptTags(doc.body), CSRFToken.get(doc).token, 'runScripts'];
  };

  CSRFToken = {
    get: function(doc) {
      var tag;
      if (doc == null) {
        doc = document;
      }
      return {
        node: tag = doc.querySelector('meta[name="csrf-token"]'),
        token: tag != null ? typeof tag.getAttribute === "function" ? tag.getAttribute('content') : void 0 : void 0
      };
    },
    update: function(latest) {
      var current;
      current = this.get();
      if ((current.token != null) && (latest != null) && current.token !== latest) {
        return current.node.setAttribute('content', latest);
      }
    }
  };

  browserCompatibleDocumentParser = function() {
    var createDocumentUsingDOM, createDocumentUsingParser, createDocumentUsingWrite, e, testDoc, _ref;
    createDocumentUsingParser = function(html) {
      return (new DOMParser).parseFromString(html, 'text/html');
    };
    createDocumentUsingDOM = function(html) {
      var doc;
      doc = document.implementation.createHTMLDocument('');
      doc.documentElement.innerHTML = html;
      return doc;
    };
    createDocumentUsingWrite = function(html) {
      var doc;
      doc = document.implementation.createHTMLDocument('');
      doc.open('replace');
      doc.write(html);
      doc.close();
      return doc;
    };
    try {
      if (window.DOMParser) {
        testDoc = createDocumentUsingParser('<html><body><p>test');
        return createDocumentUsingParser;
      }
    } catch (_error) {
      e = _error;
      testDoc = createDocumentUsingDOM('<html><body><p>test');
      return createDocumentUsingDOM;
    } finally {
      if ((testDoc != null ? (_ref = testDoc.body) != null ? _ref.childNodes.length : void 0 : void 0) !== 1) {
        return createDocumentUsingWrite;
      }
    }
  };

  ComponentUrl = (function() {
    function ComponentUrl(original) {
      this.original = original != null ? original : document.location.href;
      if (this.original.constructor === ComponentUrl) {
        return this.original;
      }
      this._parse();
    }

    ComponentUrl.prototype.withoutHash = function() {
      return this.href.replace(this.hash, '');
    };

    ComponentUrl.prototype.withoutHashForIE10compatibility = function() {
      return this.withoutHash();
    };

    ComponentUrl.prototype.hasNoHash = function() {
      return this.hash.length === 0;
    };

    ComponentUrl.prototype._parse = function() {
      var _ref;
      (this.link != null ? this.link : this.link = document.createElement('a')).href = this.original;
      _ref = this.link, this.href = _ref.href, this.protocol = _ref.protocol, this.host = _ref.host, this.hostname = _ref.hostname, this.port = _ref.port, this.pathname = _ref.pathname, this.search = _ref.search, this.hash = _ref.hash;
      this.origin = [this.protocol, '//', this.hostname].join('');
      if (this.port.length !== 0) {
        this.origin += ":" + this.port;
      }
      this.relative = [this.pathname, this.search, this.hash].join('');
      return this.absolute = this.href;
    };

    return ComponentUrl;

  })();

  Link = (function(_super) {
    __extends(Link, _super);

    Link.HTML_EXTENSIONS = ['html'];

    Link.allowExtensions = function() {
      var extension, extensions, _i, _len;
      extensions = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      for (_i = 0, _len = extensions.length; _i < _len; _i++) {
        extension = extensions[_i];
        Link.HTML_EXTENSIONS.push(extension);
      }
      return Link.HTML_EXTENSIONS;
    };

    function Link(link) {
      this.link = link;
      if (this.link.constructor === Link) {
        return this.link;
      }
      this.original = this.link.href;
      Link.__super__.constructor.apply(this, arguments);
    }

    Link.prototype.shouldIgnore = function() {
      return this._crossOrigin() || this._anchored() || this._nonHtml() || this._optOut() || this._target();
    };

    Link.prototype._crossOrigin = function() {
      return this.origin !== (new ComponentUrl).origin;
    };

    Link.prototype._anchored = function() {
      var current;
      return ((this.hash && this.withoutHash()) === (current = new ComponentUrl).withoutHash()) || (this.href === current.href + '#');
    };

    Link.prototype._nonHtml = function() {
      return this.pathname.match(/\.[a-z]+$/g) && !this.pathname.match(new RegExp("\\.(?:" + (Link.HTML_EXTENSIONS.join('|')) + ")?$", 'g'));
    };

    Link.prototype._optOut = function() {
      var ignore, link;
      link = this.link;
      while (!(ignore || link === document)) {
        ignore = link.getAttribute('data-no-turbolink') != null;
        link = link.parentNode;
      }
      return ignore;
    };

    Link.prototype._target = function() {
      return this.link.target.length !== 0;
    };

    return Link;

  })(ComponentUrl);

  Click = (function() {
    Click.installHandlerLast = function(event) {
      if (!event.defaultPrevented) {
        document.removeEventListener('click', Click.handle, false);
        return document.addEventListener('click', Click.handle, false);
      }
    };

    Click.handle = function(event) {
      return new Click(event);
    };

    function Click(event) {
      this.event = event;
      if (this.event.defaultPrevented) {
        return;
      }
      this._extractLink();
      if (this._validForTurbolinks()) {
        if (!pageChangePrevented()) {
          visit(this.link.href);
        }
        this.event.preventDefault();
      }
    }

    Click.prototype._extractLink = function() {
      var link;
      link = this.event.target;
      while (!(!link.parentNode || link.nodeName === 'A')) {
        link = link.parentNode;
      }
      if (link.nodeName === 'A' && link.href.length !== 0) {
        return this.link = new Link(link);
      }
    };

    Click.prototype._validForTurbolinks = function() {
      return (this.link != null) && !(this.link.shouldIgnore() || this._nonStandardClick());
    };

    Click.prototype._nonStandardClick = function() {
      return this.event.which > 1 || this.event.metaKey || this.event.ctrlKey || this.event.shiftKey || this.event.altKey;
    };

    return Click;

  })();

  bypassOnLoadPopstate = function(fn) {
    return setTimeout(fn, 500);
  };

  installDocumentReadyPageEventTriggers = function() {
    return document.addEventListener('DOMContentLoaded', (function() {
      triggerEvent('page:change');
      return triggerEvent('page:update');
    }), true);
  };

  installJqueryAjaxSuccessPageUpdateTrigger = function() {
    if (typeof jQuery !== 'undefined') {
      return jQuery(document).on('ajaxSuccess', function(event, xhr, settings) {
        if (!jQuery.trim(xhr.responseText)) {
          return;
        }
        return triggerEvent('page:update');
      });
    }
  };

  installHistoryChangeHandler = function(event) {
    var cachedPage, _ref;
    if ((_ref = event.state) != null ? _ref.turbolinks : void 0) {
      if (cachedPage = pageCache[(new ComponentUrl(event.state.url)).absolute]) {
        cacheCurrentPage();
        return fetchHistory(cachedPage);
      } else {
        return visit(event.target.location.href);
      }
    }
  };

  initializeTurbolinks = function() {
    rememberCurrentUrl();
    rememberCurrentState();
    createDocument = browserCompatibleDocumentParser();
    document.addEventListener('click', Click.installHandlerLast, true);
    return bypassOnLoadPopstate(function() {
      return window.addEventListener('popstate', installHistoryChangeHandler, false);
    });
  };

  historyStateIsDefined = window.history.state !== void 0 || navigator.userAgent.match(/Firefox\/2[6|7]/);

  browserSupportsPushState = window.history && window.history.pushState && window.history.replaceState && historyStateIsDefined;

  browserIsntBuggy = !navigator.userAgent.match(/CriOS\//);

  requestMethodIsSafe = (_ref = popCookie('request_method')) === 'GET' || _ref === '';

  browserSupportsTurbolinks = browserSupportsPushState && browserIsntBuggy && requestMethodIsSafe;

  browserSupportsCustomEvents = document.addEventListener && document.createEvent;

  if (browserSupportsCustomEvents) {
    installDocumentReadyPageEventTriggers();
    installJqueryAjaxSuccessPageUpdateTrigger();
  }

  if (browserSupportsTurbolinks) {
    visit = fetch;
    initializeTurbolinks();
  } else {
    visit = function(url) {
      return document.location.href = url;
    };
  }

  this.Turbolinks = {
    visit: visit,
    pagesCached: pagesCached,
    enableTransitionCache: enableTransitionCache,
    allowLinkExtensions: Link.allowExtensions,
    supported: browserSupportsTurbolinks
  };

}).call(this);
/*! Ractive - v0.3.3 - 2013-07-21
* Next-generation DOM manipulation

* http://rich-harris.github.com/Ractive/
* Copyright (c) 2013 Rich Harris; Licensed MIT */

/*jslint eqeq: true, plusplus: true */
/*global document, HTMLElement */



(function ( global ) {

'use strict';

var Ractive,

doc = global.document || null,

// Ractive prototype
proto = {},

// properties of the public Ractive object
adaptors = {},
eventDefinitions = {},
easing,
extend,
parse,
interpolate,
interpolators,
transitions = {},


// internal utils - instance-specific
teardown,
clearCache,
registerDependant,
unregisterDependant,
notifyDependants,
notifyMultipleDependants,
notifyDependantsByPriority,
registerIndexRef,
unregisterIndexRef,
resolveRef,
processDeferredUpdates,


// internal utils
splitKeypath,
toString,
isArray,
isObject,
isNumeric,
isEqual,
getEl,
insertHtml,
reassignFragments,
executeTransition,
getPartialDescriptor,
makeTransitionManager,
requestAnimationFrame,
defineProperty,
defineProperties,
create,
createFromNull,
hasOwn = {}.hasOwnProperty,
noop = function () {},


// internally used caches
keypathCache = {},


// internally used constructors
DomFragment,
DomElement,
DomAttribute,
DomPartial,
DomInterpolator,
DomTriple,
DomSection,
DomText,

StringFragment,
StringPartial,
StringInterpolator,
StringSection,
StringText,

ExpressionResolver,
Evaluator,
Animation,


// internally used regexes
leadingWhitespace = /^\s+/,
trailingWhitespace = /\s+$/,


// other bits and pieces
render,

initMustache,
updateMustache,
resolveMustache,
evaluateMustache,

initFragment,
updateSection,

animationCollection,


// array modification
registerKeypathToArray,
unregisterKeypathFromArray,


// parser and tokenizer
getFragmentStubFromTokens,
getToken,
tokenize,
stripCommentTokens,
stripHtmlComments,
stripStandalones,


// error messages
missingParser = 'Missing Ractive.parse - cannot parse template. Either preparse or use the version that includes the parser',


// constants
TEXT              = 1,
INTERPOLATOR      = 2,
TRIPLE            = 3,
SECTION           = 4,
INVERTED          = 5,
CLOSING           = 6,
ELEMENT           = 7,
PARTIAL           = 8,
COMMENT           = 9,
DELIMCHANGE       = 10,
MUSTACHE          = 11,
TAG               = 12,
ATTR_VALUE_TOKEN  = 13,
EXPRESSION        = 14,

NUMBER_LITERAL    = 20,
STRING_LITERAL    = 21,
ARRAY_LITERAL     = 22,
OBJECT_LITERAL    = 23,
BOOLEAN_LITERAL   = 24,
LITERAL           = 25,
GLOBAL            = 26,


REFERENCE         = 30,
REFINEMENT        = 31,
MEMBER            = 32,
PREFIX_OPERATOR   = 33,
BRACKETED         = 34,
CONDITIONAL       = 35,
INFIX_OPERATOR    = 36,

INVOCATION        = 40,

UNSET             = { unset: true },


// namespaces
namespaces = {
	html:   'http://www.w3.org/1999/xhtml',
	mathml: 'http://www.w3.org/1998/Math/MathML',
	svg:    'http://www.w3.org/2000/svg',
	xlink:  'http://www.w3.org/1999/xlink',
	xml:    'http://www.w3.org/XML/1998/namespace',
	xmlns:  'http://www.w3.org/2000/xmlns/'
},


// current version
VERSION = '0.3.3';



// we're creating a defineProperty function here - we don't want to add
// this to _legacy.js since it's not a polyfill. It won't allow us to set
// non-enumerable properties. That shouldn't be a problem, unless you're
// using for...in on a (modified) array, in which case you deserve what's
// coming anyway
try {
	Object.defineProperty({}, 'test', { value: 0 });
	Object.defineProperties({}, { test: { value: 0 } });

	defineProperty = Object.defineProperty;
	defineProperties = Object.defineProperties;
} catch ( err ) {
	// Object.defineProperty doesn't exist, or we're in IE8 where you can
	// only use it with DOM objects (what the fuck were you smoking, MSFT?)
	defineProperty = function ( obj, prop, desc ) {
		obj[ prop ] = desc.value;
	};

	defineProperties = function ( obj, props ) {
		var prop;

		for ( prop in props ) {
			if ( props.hasOwnProperty( prop ) ) {
				defineProperty( obj, prop, props[ prop ] );
			}
		}
	};
}


try {
	Object.create( null );

	create = Object.create;

	createFromNull = function () {
		return Object.create( null );
	};
} catch ( err ) {
	// sigh
	create = (function () {
		var F = function () {};

		return function ( proto, props ) {
			var obj;

			F.prototype = proto;
			obj = new F();

			if ( props ) {
				Object.defineProperties( obj, props );
			}

			return obj;
		};
	}());

	createFromNull = function () {
		return {}; // hope you're not modifying the Object prototype
	};
}



var hyphenate = function ( str ) {
	return str.replace( /[A-Z]/g, function ( match ) {
		return '-' + match.toLowerCase();
	});
};

// determine some facts about our environment
var cssTransitionsEnabled, transition, transitionend;

(function () {

	var testDiv;

	if ( !doc ) {
		return;
	}

	testDiv = doc.createElement( 'div' );

	if ( testDiv.style.transition !== undefined ) {
		transition = 'transition';
		transitionend = 'transitionend';
		cssTransitionsEnabled = true;
	} else if ( testDiv.style.webkitTransition !== undefined ) {
		transition = 'webkitTransition';
		transitionend = 'webkitTransitionEnd';
		cssTransitionsEnabled = true;
	} else {
		cssTransitionsEnabled = false;
	}

}());
executeTransition = function ( descriptor, root, owner, contextStack, isIntro ) {
	var transitionName, transitionParams, fragment, transitionManager, transition;

	if ( !root.transitionsEnabled ) {
		return;
	}

	if ( typeof descriptor === 'string' ) {
		transitionName = descriptor;
	} else {
		transitionName = descriptor.n;

		if ( descriptor.a ) {
			transitionParams = descriptor.a;
		} else if ( descriptor.d ) {
			fragment = new TextFragment({
				descriptor:   descriptor.d,
				root:         root,
				owner:        owner,
				contextStack: parentFragment.contextStack
			});

			transitionParams = fragment.toJson();
			fragment.teardown();
		}
	}

	transition = root.transitions[ transitionName ] || Ractive.transitions[ transitionName ];

	if ( transition ) {
		transitionManager = root._transitionManager;

		transitionManager.push( owner.node );
		transition.call( root, owner.node, function () {
			transitionManager.pop( owner.node );
		}, transitionParams, transitionManager.info, isIntro );
	}
};
insertHtml = function ( html, docFrag ) {
	var div, nodes = [];

	div = doc.createElement( 'div' );
	div.innerHTML = html;

	while ( div.firstChild ) {
		nodes[ nodes.length ] = div.firstChild;
		docFrag.appendChild( div.firstChild );
	}

	return nodes;
};
(function () {

	var reassignFragment, reassignElement, reassignMustache;

	reassignFragments = function ( root, section, start, end, by ) {
		var fragmentsToReassign, i, fragment, indexRef, oldIndex, newIndex, oldKeypath, newKeypath;

		indexRef = section.descriptor.i;

		for ( i=start; i<end; i+=1 ) {
			fragment = section.fragments[i];

			oldIndex = i - by;
			newIndex = i;

			oldKeypath = section.keypath + '.' + ( i - by );
			newKeypath = section.keypath + '.' + i;

			// change the fragment index
			fragment.index += by;

			reassignFragment( fragment, indexRef, oldIndex, newIndex, by, oldKeypath, newKeypath );
		}

		processDeferredUpdates( root );
	};

	reassignFragment = function ( fragment, indexRef, oldIndex, newIndex, by, oldKeypath, newKeypath ) {
		var i, j, item, context;

		if ( fragment.indexRefs && fragment.indexRefs[ indexRef ] !== undefined ) {
			fragment.indexRefs[ indexRef ] = newIndex;
		}

		// fix context stack
		i = fragment.contextStack.length;
		while ( i-- ) {
			context = fragment.contextStack[i];
			if ( context.substr( 0, oldKeypath.length ) === oldKeypath ) {
				fragment.contextStack[i] = context.replace( oldKeypath, newKeypath );
			}
		}

		i = fragment.items.length;
		while ( i-- ) {
			item = fragment.items[i];

			switch ( item.type ) {
				case ELEMENT:
				reassignElement( item, indexRef, oldIndex, newIndex, by, oldKeypath, newKeypath );
				break;

				case PARTIAL:
				reassignFragment( item.fragment, indexRef, oldIndex, newIndex, by, oldKeypath, newKeypath );
				break;

				case SECTION:
				case INTERPOLATOR:
				case TRIPLE:
				reassignMustache( item, indexRef, oldIndex, newIndex, by, oldKeypath, newKeypath );
				break;
			}
		}
	};

	reassignElement = function ( element, indexRef, oldIndex, newIndex, by, oldKeypath, newKeypath ) {
		var i, attribute;

		i = element.attributes.length;
		while ( i-- ) {
			attribute = element.attributes[i];

			if ( attribute.fragment ) {
				reassignFragment( attribute.fragment, indexRef, oldIndex, newIndex, by, oldKeypath, newKeypath );

				if ( attribute.twoway ) {
					attribute.updateBindings();
				}
			}
		}

		// reassign proxy argument fragments TODO and intro/outro param fragments
		if ( element.proxyFrags ) {
			i = element.proxyFrags.length;
			while ( i-- ) {
				reassignFragment( element.proxyFrags[i], indexRef, oldIndex, newIndex, by, oldKeypath, newKeypath );
			}
		}

		if ( element.node._ractive ) {
			if ( element.node._ractive.keypath.substr( 0, oldKeypath.length ) === oldKeypath ) {
				element.node._ractive.keypath = element.node._ractive.keypath.replace( oldKeypath, newKeypath );
			}

			element.node._ractive.index[ indexRef ] = newIndex;
		}

		// reassign children
		if ( element.fragment ) {
			reassignFragment( element.fragment, indexRef, oldIndex, newIndex, by, oldKeypath, newKeypath );
		}
	};

	reassignMustache = function ( mustache, indexRef, oldIndex, newIndex, by, oldKeypath, newKeypath ) {
		var i;

		// expression mustache?
		if ( mustache.descriptor.x ) {
			if ( mustache.keypath ) {
				unregisterDependant( mustache );
			}
			
			if ( mustache.expressionResolver ) {
				mustache.expressionResolver.teardown();
			}

			mustache.expressionResolver = new ExpressionResolver( mustache );
		}

		// normal keypath mustache?
		if ( mustache.keypath ) {
			if ( mustache.keypath.substr( 0, oldKeypath.length ) === oldKeypath ) {
				unregisterDependant( mustache );

				mustache.keypath = mustache.keypath.replace( oldKeypath, newKeypath );
				registerDependant( mustache );
			}
		}

		// index ref mustache?
		else if ( mustache.indexRef === indexRef ) {
			mustache.value = newIndex;
			mustache.render( newIndex );
		}

		// otherwise, it's an unresolved reference. the context stack has been updated
		// so it will take care of itself

		// if it's a section mustache, we need to go through any children
		if ( mustache.fragments ) {
			i = mustache.fragments.length;
			while ( i-- ) {
				reassignFragment( mustache.fragments[i], indexRef, oldIndex, newIndex, by, oldKeypath, newKeypath );
			}
		}
	};

}());
(function ( cache ) {

	var Reference, getFunctionFromString;

	Evaluator = function ( root, keypath, functionStr, args, priority ) {
		var i, arg;

		this.root = root;
		this.keypath = keypath;

		this.fn = getFunctionFromString( functionStr, args.length );
		this.values = [];
		this.refs = [];

		i = args.length;
		while ( i-- ) {
			arg = args[i];

			if ( arg[0] ) {
				// this is an index ref... we don't need to register a dependant
				this.values[i] = arg[1];
			}

			else {
				this.refs[ this.refs.length ] = new Reference( root, arg[1], this, i, priority );
			}
		}

		this.selfUpdating = ( this.refs.length <= 1 );

		this.update();
	};

	Evaluator.prototype = {
		bubble: function () {
			// If we only have one reference, we can update immediately...
			if ( this.selfUpdating ) {
				this.update();
			}

			// ...otherwise we want to register it as a deferred item, to be
			// updated once all the information is in, to prevent unnecessary
			// cascading. Only if we're already resolved, obviously
			else if ( !this.deferred ) {
				this.root._defEvals[ this.root._defEvals.length ] = this;
				this.deferred = true;
			}
		},

		update: function () {
			var value;

			try {
				value = this.fn.apply( null, this.values );
			} catch ( err ) {
				if ( this.root.debug ) {
					throw err;
				} else {
					value = undefined;
				}
			}

			if ( !isEqual( value, this.value ) ) {
				clearCache( this.root, this.keypath );
				this.root._cache[ this.keypath ] = value;
				notifyDependants( this.root, this.keypath );

				this.value = value;
			}

			return this;
		},

		// TODO should evaluators ever get torn down?
		teardown: function () {
			while ( this.refs.length ) {
				this.refs.pop().teardown();
			}

			clearCache( this.root, this.keypath );
			this.root._evaluators[ this.keypath ] = null;
		},

		// This method forces the evaluator to sync with the current model
		// in the case of a smart update
		refresh: function () {
			if ( !this.selfUpdating ) {
				this.deferred = true;
			}

			var i = this.refs.length;
			while ( i-- ) {
				this.refs[i].update();
			}

			if ( this.deferred ) {
				this.update();
				this.deferred = false;
			}
		}
	};


	Reference = function ( root, keypath, evaluator, argNum, priority ) {
		this.evaluator = evaluator;
		this.keypath = keypath;
		this.root = root;
		this.argNum = argNum;
		this.type = REFERENCE;
		this.priority = priority;

		this.value = evaluator.values[ argNum ] = root.get( keypath );

		registerDependant( this );
	};

	Reference.prototype = {
		update: function () {
			var value = this.root.get( this.keypath );

			if ( !isEqual( value, this.value ) ) {
				this.evaluator.values[ this.argNum ] = value;
				this.evaluator.bubble();

				this.value = value;
			}
		},

		teardown: function () {
			unregisterDependant( this );
		}
	};


	getFunctionFromString = function ( str, i ) {
		var fn, args;

		str = str.replace( /❖/g, '_' );

		if ( cache[ str ] ) {
			return cache[ str ];
		}

		args = [];
		while ( i-- ) {
			args[i] = '_' + i;
		}

		fn = new Function( args.join( ',' ), 'return(' + str + ')' );

		cache[ str ] = fn;
		return fn;
	};



}({}));
(function () {

	var ReferenceScout, getKeypath;

	ExpressionResolver = function ( mustache ) {

		var expression, i, len, ref, indexRefs, args;

		this.root = mustache.root;
		this.mustache = mustache;
		this.args = [];
		this.scouts = [];

		expression = mustache.descriptor.x;
		indexRefs = mustache.parentFragment.indexRefs;

		this.str = expression.s;

		// send out scouts for each reference
		len = this.unresolved = ( expression.r ? expression.r.length : 0 );

		if ( !len ) {
			this.init(); // some expressions don't have references. edge case, but, yeah.
		}

		for ( i=0; i<len; i+=1 ) {
			ref = expression.r[i];
			
			// is this an index ref?
			if ( indexRefs && indexRefs[ ref ] !== undefined ) {
				this.resolveRef( i, true, indexRefs[ ref ] );
			}

			else {
				this.scouts[ this.scouts.length ] = new ReferenceScout( this, ref, mustache.contextStack, i );
			}
		}
	};

	ExpressionResolver.prototype = {
		init: function () {
			this.keypath = getKeypath( this.str, this.args );
			this.createEvaluator();

			this.mustache.resolve( this.keypath );
		},

		teardown: function () {
			while ( this.scouts.length ) {
				this.scouts.pop().teardown();
			}
		},

		resolveRef: function ( argNum, isIndexRef, value ) {
			this.args[ argNum ] = [ isIndexRef, value ];

			// can we initialise yet?
			if ( --this.unresolved ) {
				// no;
				return;
			}

			this.init();
		},

		createEvaluator: function () {
			// only if it doesn't exist yet!
			if ( !this.root._evaluators[ this.keypath ] ) {
				this.root._evaluators[ this.keypath ] = new Evaluator( this.root, this.keypath, this.str, this.args, this.mustache.priority );
			}

			else {
				// we need to trigger a refresh of the evaluator, since it
				// will have become de-synced from the model if we're in a
				// reassignment cycle
				this.root._evaluators[ this.keypath ].refresh();
			}
		}
	};


	ReferenceScout = function ( resolver, ref, contextStack, argNum ) {
		var keypath, root;

		root = this.root = resolver.root;

		keypath = resolveRef( root, ref, contextStack );
		if ( keypath ) {
			resolver.resolveRef( argNum, false, keypath );
		} else {
			this.ref = ref;
			this.argNum = argNum;
			this.resolver = resolver;
			this.contextStack = contextStack;

			root._pendingResolution[ root._pendingResolution.length ] = this;
		}
	};

	ReferenceScout.prototype = {
		resolve: function ( keypath ) {
			this.keypath = keypath;
			this.resolver.resolveRef( this.argNum, false, keypath );
		},

		teardown: function () {
			// if we haven't found a keypath yet, we can
			// stop the search now
			if ( !this.keypath ) {
				teardown( this );
			}
		}
	};

	getKeypath = function ( str, args ) {
		var unique;

		// get string that is unique to this expression
		unique = str.replace( /❖([0-9]+)/g, function ( match, $1 ) {
			return args[ $1 ][1];
		});

		// then sanitize by removing any periods or square brackets. Otherwise
		// splitKeypath will go mental!
		return '(' + unique.replace( /[\.\[\]]/g, '-' ) + ')';
	};

}());
(function () {

	var getPartialFromRegistry, unpack;

	getPartialDescriptor = function ( root, name ) {
		var el, partial;

		// If the partial was specified on this instance, great
		if ( partial = getPartialFromRegistry( root, name ) ) {
			return partial;
		}

		// If not, is it a global partial?
		if ( partial = getPartialFromRegistry( Ractive, name ) ) {
			return partial;
		}

		// Does it exist on the page as a script tag?
		if ( doc ) {
			el = doc.getElementById( name );
			if ( el && el.tagName === 'SCRIPT' ) {
				if ( !Ractive.parse ) {
					throw new Error( missingParser );
				}

				Ractive.partials[ name ] = Ractive.parse( el.innerHTML );
			}
		}

		partial = Ractive.partials[ name ];

		// No match? Return an empty array
		if ( !partial ) {
			if ( root.debug && console && console.warn ) {
				console.warn( 'Could not find descriptor for partial "' + name + '"' );
			}

			return [];
		}

		return unpack( partial );
	};

	getPartialFromRegistry = function ( registry, name ) {
		if ( registry.partials[ name ] ) {
			
			// If this was added manually to the registry, but hasn't been parsed,
			// parse it now
			if ( typeof registry.partials[ name ] === 'string' ) {
				if ( !Ractive.parse ) {
					throw new Error( missingParser );
				}

				registry.partials[ name ] = Ractive.parse( registry.partials[ name ] );
			}

			return unpack( registry.partials[ name ] );
		}
	};

	unpack = function ( partial ) {
		// Unpack string, if necessary
		if ( partial.length === 1 && typeof partial[0] === 'string' ) {
			return partial[0];
		}

		return partial;
	};

}());
initFragment = function ( fragment, options ) {

	var numItems, i, itemOptions, parentRefs, ref;

	// The item that owns this fragment - an element, section, partial, or attribute
	fragment.owner = options.owner;

	// inherited properties
	fragment.root = options.root;
	fragment.parentNode = options.parentNode;
	fragment.contextStack = options.contextStack || [];

	// If parent item is a section, this may not be the only fragment
	// that belongs to it - we need to make a note of the index
	if ( fragment.owner.type === SECTION ) {
		fragment.index = options.index;
	}

	// index references (the 'i' in {{#section:i}}<!-- -->{{/section}}) need to cascade
	// down the tree
	if ( fragment.owner.parentFragment ) {
		parentRefs = fragment.owner.parentFragment.indexRefs;

		if ( parentRefs ) {
			fragment.indexRefs = createFromNull(); // avoids need for hasOwnProperty

			for ( ref in parentRefs ) {
				fragment.indexRefs[ ref ] = parentRefs[ ref ];
			}
		}

		// while we're in this branch, inherit priority
		fragment.priority = fragment.owner.parentFragment.priority + 1;
	} else {
		fragment.priority = 0;
	}

	if ( options.indexRef ) {
		if ( !fragment.indexRefs ) {
			fragment.indexRefs = {};
		}

		fragment.indexRefs[ options.indexRef ] = options.index;
	}

	// Time to create this fragment's child items;
	fragment.items = [];

	itemOptions = {
		parentFragment: fragment
	};

	numItems = ( options.descriptor ? options.descriptor.length : 0 );
	for ( i=0; i<numItems; i+=1 ) {
		itemOptions.descriptor = options.descriptor[i];
		itemOptions.index = i;

		fragment.items[ fragment.items.length ] = fragment.createItem( itemOptions );
	}

};
initMustache = function ( mustache, options ) {

	var keypath, index, indexRef, parentFragment;

	parentFragment = mustache.parentFragment = options.parentFragment;

	mustache.root           = parentFragment.root;
	mustache.contextStack   = parentFragment.contextStack;
	
	mustache.descriptor     = options.descriptor;
	mustache.index          = options.index || 0;
	mustache.priority       = parentFragment.priority;

	// DOM only
	if ( parentFragment.parentNode ) {
		mustache.parentNode = parentFragment.parentNode;
	}

	mustache.type = options.descriptor.t;


	// if this is a simple mustache, with a reference, we just need to resolve
	// the reference to a keypath
	if ( options.descriptor.r ) {
		if ( parentFragment.indexRefs && parentFragment.indexRefs[ options.descriptor.r ] !== undefined ) {
			indexRef = parentFragment.indexRefs[ options.descriptor.r ];

			mustache.indexRef = options.descriptor.r;
			mustache.value = indexRef;
			mustache.render( mustache.value );
		}

		else {
			keypath = resolveRef( mustache.root, options.descriptor.r, mustache.contextStack );
			if ( keypath ) {
				mustache.resolve( keypath );
			} else {
				mustache.ref = options.descriptor.r;
				mustache.root._pendingResolution[ mustache.root._pendingResolution.length ] = mustache;

				// inverted section? initialise
				if ( mustache.descriptor.n ) {
					mustache.render( false );
				}
			}
		}
	}

	// if it's an expression, we have a bit more work to do
	if ( options.descriptor.x ) {
		mustache.expressionResolver = new ExpressionResolver( mustache );
	}

};


// methods to add to individual mustache prototypes
updateMustache = function () {
	var value;

	value = this.root.get( this.keypath, true );

	if ( !isEqual( value, this.value ) ) {
		this.render( value );
		this.value = value;
	}
};

resolveMustache = function ( keypath ) {
	// TEMP
	this.keypath = keypath;

	registerDependant( this );
	this.update();

	if ( this.expressionResolver ) {
		this.expressionResolver = null;
	}
};
(function () {

	var updateInvertedSection, updateListSection, updateContextSection, updateConditionalSection;

	updateSection = function ( section, value ) {
		var fragmentOptions;

		fragmentOptions = {
			descriptor: section.descriptor.f,
			root:       section.root,
			parentNode: section.parentNode,
			owner:      section
		};

		// if section is inverted, only check for truthiness/falsiness
		if ( section.descriptor.n ) {
			updateConditionalSection( section, value, true, fragmentOptions );
			return;
		}

		// otherwise we need to work out what sort of section we're dealing with

		// if value is an array, iterate through
		if ( isArray( value ) ) {
			updateListSection( section, value, fragmentOptions );
		}


		// if value is a hash...
		else if ( isObject( value ) ) {
			updateContextSection( section, fragmentOptions );
		}


		// otherwise render if value is truthy, unrender if falsy
		else {
			updateConditionalSection( section, value, false, fragmentOptions );
		}
	};

	updateListSection = function ( section, value, fragmentOptions ) {
		var i, fragmentsToRemove;

		// if the array is shorter than it was previously, remove items
		if ( value.length < section.length ) {
			fragmentsToRemove = section.fragments.splice( value.length, section.length - value.length );

			while ( fragmentsToRemove.length ) {
				fragmentsToRemove.pop().teardown( true );
			}
		}

		// otherwise...
		else {

			if ( value.length > section.length ) {
				// add any new ones
				for ( i=section.length; i<value.length; i+=1 ) {
					// append list item to context stack
					fragmentOptions.contextStack = section.contextStack.concat( section.keypath + '.' + i );
					fragmentOptions.index = i;

					if ( section.descriptor.i ) {
						fragmentOptions.indexRef = section.descriptor.i;
					}

					section.fragments[i] = section.createFragment( fragmentOptions );
				}
			}
		}

		section.length = value.length;
	};

	updateContextSection = function ( section, fragmentOptions ) {
		// ...then if it isn't rendered, render it, adding section.keypath to the context stack
		// (if it is already rendered, then any children dependent on the context stack
		// will update themselves without any prompting)
		if ( !section.length ) {
			// append this section to the context stack
			fragmentOptions.contextStack = section.contextStack.concat( section.keypath );
			fragmentOptions.index = 0;

			section.fragments[0] = section.createFragment( fragmentOptions );
			section.length = 1;
		}
	};

	updateConditionalSection = function ( section, value, inverted, fragmentOptions ) {
		var doRender, emptyArray, fragmentsToRemove;

		emptyArray = ( isArray( value ) && value.length === 0 );

		if ( inverted ) {
			doRender = emptyArray || !value;
		} else {
			doRender = value && !emptyArray;
		}

		if ( doRender ) {
			if ( !section.length ) {
				// no change to context stack
				fragmentOptions.contextStack = section.contextStack;
				fragmentOptions.index = 0;

				section.fragments[0] = section.createFragment( fragmentOptions );
				section.length = 1;
			}

			if ( section.length > 1 ) {
				fragmentsToRemove = section.fragments.splice( 1 );
				
				while ( fragmentsToRemove.length ) {
					fragmentsToRemove.pop().teardown( true );
				}
			}
		}

		else if ( section.length ) {
			section.teardownFragments( true );
			section.length = 0;
		}
	};

}());
stripCommentTokens = function ( tokens ) {
	var i, current, previous, next;

	for ( i=0; i<tokens.length; i+=1 ) {
		current = tokens[i];
		previous = tokens[i-1];
		next = tokens[i+1];

		// if the current token is a comment or a delimiter change, remove it...
		if ( current.mustacheType === COMMENT || current.mustacheType === DELIMCHANGE ) {
			
			tokens.splice( i, 1 ); // remove comment token

			// ... and see if it has text nodes either side, in which case
			// they can be concatenated
			if ( previous && next ) {
				if ( previous.type === TEXT && next.type === TEXT ) {
					previous.value += next.value;
					
					tokens.splice( i, 1 ); // remove next token
				}
			}

			i -= 1; // decrement i to account for the splice(s)
		}
	}

	return tokens;
};
stripHtmlComments = function ( html ) {
	var commentStart, commentEnd, processed;

	processed = '';

	while ( html.length ) {
		commentStart = html.indexOf( '<!--' );
		commentEnd = html.indexOf( '-->' );

		// no comments? great
		if ( commentStart === -1 && commentEnd === -1 ) {
			processed += html;
			break;
		}

		// comment start but no comment end
		if ( commentStart !== -1 && commentEnd === -1 ) {
			throw 'Illegal HTML - expected closing comment sequence (\'-->\')';
		}

		// comment end but no comment start, or comment end before comment start
		if ( ( commentEnd !== -1 && commentStart === -1 ) || ( commentEnd < commentStart ) ) {
			throw 'Illegal HTML - unexpected closing comment sequence (\'-->\')';
		}

		processed += html.substr( 0, commentStart );
		html = html.substring( commentEnd + 3 );
	}

	return processed;
};
stripStandalones = function ( tokens ) {
	var i, current, backOne, backTwo, leadingLinebreak, trailingLinebreak;

	leadingLinebreak = /^\s*\r?\n/;
	trailingLinebreak = /\r?\n\s*$/;

	for ( i=2; i<tokens.length; i+=1 ) {
		current = tokens[i];
		backOne = tokens[i-1];
		backTwo = tokens[i-2];

		// if we're at the end of a [text][mustache][text] sequence...
		if ( current.type === TEXT && ( backOne.type === MUSTACHE ) && backTwo.type === TEXT ) {
			
			// ... and the mustache is a standalone (i.e. line breaks either side)...
			if ( trailingLinebreak.test( backTwo.value ) && leadingLinebreak.test( current.value ) ) {
			
				// ... then we want to remove the whitespace after the first line break
				// if the mustache wasn't a triple or interpolator or partial
				if ( backOne.mustacheType !== INTERPOLATOR && backOne.mustacheType !== TRIPLE ) {
					backTwo.value = backTwo.value.replace( trailingLinebreak, '\n' );
				}

				// and the leading line break of the second text token
				current.value = current.value.replace( leadingLinebreak, '' );

				// if that means the current token is now empty, we should remove it
				if ( current.value === '' ) {
					tokens.splice( i--, 1 ); // splice and decrement
				}
			}
		}
	}

	return tokens;
};
(function ( proto ) {

	var add = function ( root, keypath, d ) {
		var value;

		if ( typeof keypath !== 'string' || !isNumeric( d ) ) {
			if ( root.debug ) {
				throw new Error( 'Bad arguments' );
			}
			return;
		}

		value = root.get( keypath );

		if ( value === undefined ) {
			value = 0;
		}

		if ( !isNumeric( value ) ) {
			if ( root.debug ) {
				throw new Error( 'Cannot add to a non-numeric value' );
			}
			return;
		}

		root.set( keypath, value + d );
	};

	proto.add = function ( keypath, d ) {
		add( this, keypath, ( d === undefined ? 1 : d ) );
	};

	proto.subtract = function ( keypath, d ) {
		add( this, keypath, ( d === undefined ? -1 : -d ) );
	};

	proto.toggle = function ( keypath ) {
		var value;

		if ( typeof keypath !== 'string' ) {
			if ( this.debug ) {
				throw new Error( 'Bad arguments' );
			}
			return;
		}

		value = this.get( keypath );
		this.set( keypath, !value );
	};

}( proto ));
(function ( proto ) {

	var animate, noAnimation;

	proto.animate = function ( keypath, to, options ) {
		
		var k, animation, animations;

		// animate multiple keypaths
		if ( typeof keypath === 'object' ) {
			options = to || {};
			animations = [];

			for ( k in keypath ) {
				if ( hasOwn.call( keypath, k ) ) {
					animations[ animations.length ] = animate( this, k, keypath[k], options );
				}
			}

			return {
				stop: function () {
					while ( animations.length ) {
						animations.pop().stop();
					}
				}
			};
		}

		// animate a single keypath
		options = options || {};

		animation = animate( this, keypath, to, options );

		return {
			stop: function () {
				animation.stop();
			}
		};
	};

	noAnimation = {
		stop: noop
	};

	animate = function ( root, keypath, to, options ) {
		var easing, duration, animation, i, keys, from;

		from = root.get( keypath );
		
		// cancel any existing animation
		// TODO what about upstream/downstream keypaths?
		i = animationCollection.animations.length;
		while ( i-- ) {
			if ( animationCollection.animations[ i ].keypath === keypath ) {
				animationCollection.animations[ i ].stop();
			}
		}

		// don't bother animating values that stay the same
		if ( isEqual( from, to ) ) {
			if ( options.complete ) {
				options.complete( 1, options.to );
			}

			return noAnimation;
		}

		// easing function
		if ( options.easing ) {
			if ( typeof options.easing === 'function' ) {
				easing = options.easing;
			}

			else {
				if ( root.easing && root.easing[ options.easing ] ) {
					// use instance easing function first
					easing = root.easing[ options.easing ];
				} else {
					// fallback to global easing functions
					easing = Ractive.easing[ options.easing ];
				}
			}

			if ( typeof easing !== 'function' ) {
				easing = null;
			}
		}

		// duration
		duration = ( options.duration === undefined ? 400 : options.duration );

		// TODO store keys, use an internal set method
		//keys = splitKeypath( keypath );

		animation = new Animation({
			keypath: keypath,
			from: from,
			to: to,
			root: root,
			duration: duration,
			easing: easing,
			step: options.step,
			complete: options.complete
		});

		animationCollection.push( animation );
		root._animations[ root._animations.length ] = animation;

		return animation;
	};

}( proto ));
proto.bind = function ( adaptor ) {
	var bound = this._bound;

	if ( bound.indexOf( adaptor ) === -1 ) {
		bound[ bound.length ] = adaptor;
		adaptor.init( this );
	}
};
proto.cancelFullscreen = function () {
	Ractive.cancelFullscreen( this.el );
};
proto.fire = function ( eventName ) {
	var args, i, len, subscribers = this._subs[ eventName ];

	if ( !subscribers ) {
		return;
	}

	args = Array.prototype.slice.call( arguments, 1 );

	for ( i=0, len=subscribers.length; i<len; i+=1 ) {
		subscribers[i].apply( this, args );
	}
};
// TODO use dontNormalise
// TODO refactor this shitball

proto.get = function ( keypath, dontNormalise ) {
	var cache, cacheMap, keys, normalised, key, parentKeypath, parentValue, value, ignoreUndefined;

	if ( !keypath ) {
		return this.data;
	}

	cache = this._cache;

	if ( isArray( keypath ) ) {
		if ( !keypath.length ) {
			return this.data;
		}

		keys = keypath.slice(); // clone
		normalised = keys.join( '.' );

		ignoreUndefined = true; // because this should be a branch, sod the cache
	}

	else {
		// cache hit? great
		if ( hasOwn.call( cache, keypath ) && cache[ keypath ] !== UNSET ) {
			return cache[ keypath ];
		}

		keys = splitKeypath( keypath );
		normalised = keys.join( '.' );
	}

	// we may have a cache hit now that it's been normalised
	if ( hasOwn.call( cache, normalised ) && cache[ normalised ] !== UNSET ) {
		if ( cache[ normalised ] === undefined && ignoreUndefined ) {
			// continue
		} else {
			return cache[ normalised ];
		}
	}

	// is this an uncached evaluator value?
	if ( this._evaluators[ normalised ] ) {
		value = this._evaluators[ normalised ].value;
		cache[ normalised ] = value;
		return value;
	}

	// otherwise it looks like we need to do some work
	key = keys.pop();
	parentKeypath = keys.join( '.' );
	parentValue = ( keys.length ? this.get( keys ) : this.data );

	if ( parentValue === null || typeof parentValue !== 'object' || parentValue === UNSET ) {
		return;
	}

	// update cache map
	if ( !( cacheMap = this._cacheMap[ parentKeypath ] ) ) {
		this._cacheMap[ parentKeypath ] = [ normalised ];
	} else {
		if ( cacheMap.indexOf( normalised ) === -1 ) {
			cacheMap[ cacheMap.length ] = normalised;
		}
	}

	value = parentValue[ key ];

	// Is this an array that needs to be wrapped?
	if ( this.modifyArrays ) {
		// if it's not an expression, is an array, and we're not here because it sent us here, wrap it
		if ( ( normalised.charAt( 0 ) !== '(' ) && isArray( value ) && ( !value._ractive || !value._ractive.setting ) ) {
			registerKeypathToArray( value, normalised, this );
		}
	}

	// Update cache
	cache[ normalised ] = value;

	return value;
};
clearCache = function ( ractive, keypath ) {
	var value, len, kp, cacheMap;

	// is this a modified array, which shouldn't fire set events on this keypath anymore?
	if ( ractive.modifyArrays ) {
		if ( keypath.charAt( 0 ) !== '(' ) { // expressions (and their children) don't get wrapped
			value = ractive._cache[ keypath ];
			if ( isArray( value ) && !value._ractive.setting ) {
				unregisterKeypathFromArray( value, keypath, ractive );
			}
		}
	}
	
	ractive._cache[ keypath ] = UNSET;

	if ( cacheMap = ractive._cacheMap[ keypath ] ) {
		while ( cacheMap.length ) {
			clearCache( ractive, cacheMap.pop() );
		}
	}
};
notifyDependants = function ( ractive, keypath, onlyDirect ) {
	var i;

	for ( i=0; i<ractive._deps.length; i+=1 ) { // can't cache ractive._deps.length, it may change
		notifyDependantsByPriority( ractive, keypath, i, onlyDirect );
	}
};
notifyDependantsByPriority = function ( ractive, keypath, priority, onlyDirect ) {
	var depsByKeypath, deps, i, len, childDeps;

	depsByKeypath = ractive._deps[ priority ];

	if ( !depsByKeypath ) {
		return;
	}

	deps = depsByKeypath[ keypath ];

	if ( deps ) {
		i = deps.length;
		while ( i-- ) {
			deps[i].update();
		}
	}

	// If we're only notifying direct dependants, not dependants
	// of downstream keypaths, then YOU SHALL NOT PASS
	if ( onlyDirect ) {
		return;
	}
	

	// cascade
	childDeps = ractive._depsMap[ keypath ];
	
	if ( childDeps ) {
		i = childDeps.length;
		while ( i-- ) {
			notifyDependantsByPriority( ractive, childDeps[i], priority );
		}
	}
};
notifyMultipleDependants = function ( ractive, keypaths, onlyDirect ) {
	var  i, j, len;

	len = keypaths.length;

	for ( i=0; i<ractive._deps.length; i+=1 ) {
		if ( ractive._deps[i] ) {
			j = len;
			while ( j-- ) {
				notifyDependantsByPriority( ractive, keypaths[j], i, onlyDirect );
			}
		}
	}
};
processDeferredUpdates = function ( ractive ) {
	var evaluator, attribute;

	while ( ractive._defEvals.length ) {
		 evaluator = ractive._defEvals.pop();
		 evaluator.update().deferred = false;
	}

	while ( ractive._defAttrs.length ) {
		attribute = ractive._defAttrs.pop();
		attribute.update().deferred = false;
	}
};
registerDependant = function ( dependant ) {
	var depsByKeypath, deps, keys, parentKeypath, map, ractive, keypath, priority;

	ractive = dependant.root;
	keypath = dependant.keypath;
	priority = dependant.priority;

	depsByKeypath = ractive._deps[ priority ] || ( ractive._deps[ priority ] = {} );
	deps = depsByKeypath[ keypath ] || ( depsByKeypath[ keypath ] = [] );

	deps[ deps.length ] = dependant;

	// update dependants map
	keys = splitKeypath( keypath );
	
	while ( keys.length ) {
		keys.pop();
		parentKeypath = keys.join( '.' );
	
		map = ractive._depsMap[ parentKeypath ] || ( ractive._depsMap[ parentKeypath ] = [] );

		if ( map[ keypath ] === undefined ) {
			map[ keypath ] = 0;
			map[ map.length ] = keypath;
		}

		map[ keypath ] += 1;

		keypath = parentKeypath;
	}
};
// Render instance to element specified here or at initialization
render = function ( ractive, options ) {
	var el, transitionManager;

	el = ( options.el ? getEl( options.el ) : ractive.el );

	// Clear the element, unless `append` is `true`
	if ( el && !options.append ) {
		el.innerHTML = '';
	}

	ractive._transitionManager = transitionManager = makeTransitionManager( ractive, options.complete );

	// Render our *root fragment*
	ractive.fragment = new DomFragment({
		descriptor: ractive.template,
		root: ractive,
		owner: ractive, // saves doing `if ( ractive.parent ) { /*...*/ }` later on
		parentNode: el
	});

	if ( el ) {
		el.appendChild( ractive.fragment.docFrag );
	}

	// transition manager has finished its work
	ractive._transitionManager = null;
	transitionManager.ready();
};
// Resolve a full keypath from `ref` within the given `contextStack` (e.g.
// `'bar.baz'` within the context stack `['foo']` might resolve to `'foo.bar.baz'`
resolveRef = function ( ractive, ref, contextStack ) {

	var keys, lastKey, innerMostContext, contextKeys, parentValue, keypath;

	// Implicit iterators - i.e. {{.}} - are a special case
	if ( ref === '.' ) {
		return contextStack[ contextStack.length - 1 ];
	}

	// References prepended with '.' are another special case
	if ( ref.charAt( 0 ) === '.' ) {
		return contextStack[ contextStack.length - 1 ] + ref;
	}

	keys = splitKeypath( ref );
	lastKey = keys.pop();

	// Clone the context stack, so we don't mutate the original
	contextStack = contextStack.concat();

	// Take each context from the stack, working backwards from the innermost context
	while ( contextStack.length ) {

		innerMostContext = contextStack.pop();
		contextKeys = splitKeypath( innerMostContext );

		parentValue = ractive.get( contextKeys.concat( keys ) );

		if ( typeof parentValue === 'object' && parentValue !== null && hasOwn.call( parentValue, lastKey ) ) {
			keypath = innerMostContext + '.' + ref;
			break;
		}
	}

	if ( !keypath && ractive.get( ref ) !== undefined ) {
		keypath = ref;
	}

	return keypath;
};
teardown = function ( thing ) {
	if ( !thing.keypath ) {
		// this was on the 'unresolved' list, we need to remove it
		var index = thing.root._pendingResolution.indexOf( thing );

		if ( index !== -1 ) {
			thing.root._pendingResolution.splice( index, 1 );
		}

	} else {
		// this was registered as a dependant
		unregisterDependant( thing );
	}
};
unregisterDependant = function ( dependant ) {
	var deps, i, keep, keys, parentKeypath, map, evaluator, ractive, keypath, priority;

	ractive = dependant.root;
	keypath = dependant.keypath;
	priority = dependant.priority;

	deps = ractive._deps[ priority ][ keypath ];
	deps.splice( deps.indexOf( dependant ), 1 );

	// update dependants map
	keys = splitKeypath( keypath );
	
	while ( keys.length ) {
		keys.pop();
		parentKeypath = keys.join( '.' );
	
		map = ractive._depsMap[ parentKeypath ];

		map[ keypath ] -= 1;

		if ( !map[ keypath ] ) {
			// remove from parent deps map
			map.splice( map.indexOf( keypath ), 1 );
			map[ keypath ] = undefined;
		}

		keypath = parentKeypath;
	}
};
proto.link = function ( keypath ) {
	var self = this;

	return function ( value ) {
		self.set( keypath, value );
	};
};
(function ( proto ) {

	var observe, Observer, updateObserver;

	proto.observe = function ( keypath, callback, options ) {

		var observers = [], k;

		if ( typeof keypath === 'object' ) {
			options = callback;

			for ( k in keypath ) {
				if ( hasOwn.call( keypath, k ) ) {
					callback = keypath[k];
					observers[ observers.length ] = observe( this, k, callback, options );
				}
			}

			return {
				cancel: function () {
					while ( observers.length ) {
						observers.pop().cancel();
					}
				}
			};
		}

		return observe( this, keypath, callback, options );
	};

	observe = function ( root, keypath, callback, options ) {
		var observer;

		observer = new Observer( root, keypath, callback, options );

		if ( !options || options.init !== false ) {
			observer.update( true );
		}

		registerDependant( observer );

		return {
			cancel: function () {
				unregisterDependant( observer );
			}
		};
	};

	Observer = function ( root, keypath, callback, options ) {
		this.root = root;
		this.keypath = keypath;
		this.callback = callback;
		this.priority = 0; // observers get top priority

		// default to root as context, but allow it to be overridden
		this.context = ( options && options.context ? options.context : root );
	};

	Observer.prototype = {
		update: function ( init ) {
			var value;

			// TODO create, and use, an internal get method instead - we can skip checks
			value = this.root.get( this.keypath, true );

			if ( !isEqual( value, this.value ) || init ) {
				// wrap the callback in a try-catch block, and only throw error in
				// debug mode
				try {
					this.callback.call( this.context, value, this.value );
				} catch ( err ) {
					if ( this.root.debug ) {
						throw err;
					}
				}
				this.value = value;
			}
		}
	};

}( proto ));


proto.off = function ( eventName, callback ) {
	var subscribers, index;

	// if no callback specified, remove all callbacks
	if ( !callback ) {
		// if no event name specified, remove all callbacks for all events
		if ( !eventName ) {
			this._subs = {};
		} else {
			this._subs[ eventName ] = [];
		}
	}

	subscribers = this._subs[ eventName ];

	if ( subscribers ) {
		index = subscribers.indexOf( callback );
		if ( index !== -1 ) {
			subscribers.splice( index, 1 );
		}
	}
};
proto.on = function ( eventName, callback ) {
	var self = this, listeners, n;

	// allow mutliple listeners to be bound in one go
	if ( typeof eventName === 'object' ) {
		listeners = [];

		for ( n in eventName ) {
			if ( hasOwn.call( eventName, n ) ) {
				listeners[ listeners.length ] = this.on( n, eventName[ n ] );
			}
		}

		return {
			cancel: function () {
				while ( listeners.length ) {
					listeners.pop().cancel();
				}
			}
		};
	}

	if ( !this._subs[ eventName ] ) {
		this._subs[ eventName ] = [ callback ];
	} else {
		this._subs[ eventName ].push( callback );
	}

	return {
		cancel: function () {
			self.off( eventName, callback );
		}
	};
};
proto.renderHTML = function () {
	return this.fragment.toString();
};
proto.requestFullscreen = function () {
	Ractive.requestFullscreen( this.el );
};
(function ( proto ) {

	var set, attemptKeypathResolution;

	proto.set = function ( keypath, value, complete ) {
		var notificationQueue, upstreamQueue, k, normalised, keys, previous, previousTransitionManager, transitionManager;

		upstreamQueue = [ '' ]; // empty string will always be an upstream keypath
		notificationQueue = [];

		if ( isObject( keypath ) ) {
			complete = value;
		}

		// manage transitions
		previousTransitionManager = this._transitionManager;
		this._transitionManager = transitionManager = makeTransitionManager( this, complete );

		// setting multiple values in one go
		if ( isObject( keypath ) ) {
			for ( k in keypath ) {
				if ( hasOwn.call( keypath, k ) ) {
					keys = splitKeypath( k );
					normalised = keys.join( '.' );
					value = keypath[k];

					set( this, normalised, keys, value, notificationQueue, upstreamQueue );
				}
			}
		}

		// setting a single value
		else {
			keys = splitKeypath( keypath );
			normalised = keys.join( '.' );

			set( this, normalised, keys, value, notificationQueue, upstreamQueue );
		}

		// if anything has changed, attempt to resolve any unresolved keypaths...
		if ( notificationQueue.length && this._pendingResolution.length ) {
			attemptKeypathResolution( this );
		}

		// ...and notify dependants
		if ( upstreamQueue.length ) {
			notifyMultipleDependants( this, upstreamQueue, true );
		}

		if ( notificationQueue.length ) {
			notifyMultipleDependants( this, notificationQueue );
		}

		// Attributes don't reflect changes automatically if there is a possibility
		// that they will need to change again before the .set() cycle is complete
		// - they defer their updates until all values have been set
		processDeferredUpdates( this );

		// transition manager has finished its work
		this._transitionManager = previousTransitionManager;
		transitionManager.ready();

		// fire event
		if ( !this.setting ) {
			this.setting = true; // short-circuit any potential infinite loops
			
			if ( typeof keypath === 'object' ) {
				this.fire( 'set', keypath );
			} else {
				this.fire( 'set', keypath, value );
			}

			this.setting = false;
		}

		return this;
	};


	set = function ( root, keypath, keys, value, queue, upstreamQueue ) {
		var previous, key, obj, keysClone, accumulated, keypathToClear;

		keysClone = keys.slice();
		accumulated = [];

		previous = root.get( keypath );

		// update the model, if necessary
		if ( previous !== value ) {
			// update data
			obj = root.data;
			while ( keys.length > 1 ) {
				key = accumulated[ accumulated.length ] = keys.shift();

				// If this branch doesn't exist yet, create a new one - if the next
				// key matches /^\s*[0-9]+\s*$/, assume we want an array branch rather
				// than an object
				if ( !obj[ key ] ) {
					
					// if we're creating a new branch, we may need to clear the upstream
					// keypath
					if ( !keypathToClear ) {
						keypathToClear = accumulated.join( '.' );
					}

					obj[ key ] = ( /^\s*[0-9]+\s*$/.test( keys[0] ) ? [] : {} );
				}

				obj = obj[ key ];
			}

			key = keys[0];

			obj[ key ] = value;
		}

		else {
			// if value is a primitive, we don't need to do anything else
			if ( typeof value !== 'object' ) {
				return;
			}
		}


		// Clear cache
		clearCache( root, keypathToClear || keypath );

		// add this keypath to the notification queue
		queue[ queue.length ] = keypath;


		// add upstream keypaths to the upstream notification queue
		while ( keysClone.length > 1 ) {
			keysClone.pop();
			keypath = keysClone.join( '.' );

			if ( upstreamQueue.indexOf( keypath ) === -1 ) {
				upstreamQueue[ upstreamQueue.length ] = keypath;
			}
		}
		
	};

	attemptKeypathResolution = function ( root ) {
		var i, unresolved, keypath;

		// See if we can resolve any of the unresolved keypaths (if such there be)
		i = root._pendingResolution.length;
		while ( i-- ) { // Work backwards, so we don't go in circles!
			unresolved = root._pendingResolution.splice( i, 1 )[0];

			if ( keypath = resolveRef( root, unresolved.ref, unresolved.contextStack ) ) {
				// If we've resolved the keypath, we can initialise this item
				unresolved.resolve( keypath );

			} else {
				// If we can't resolve the reference, add to the back of
				// the queue (this is why we're working backwards)
				root._pendingResolution[ root._pendingResolution.length ] = unresolved;
			}
		}
	};

}( proto ));
// Teardown. This goes through the root fragment and all its children, removing observers
// and generally cleaning up after itself
proto.teardown = function ( complete ) {
	var keypath, transitionManager, previousTransitionManager;

	this.fire( 'teardown' );

	previousTransitionManager = this._transitionManager;
	this._transitionManager = transitionManager = makeTransitionManager( this, complete );

	this.fragment.teardown( true );

	// Cancel any animations in progress
	while ( this._animations[0] ) {
		this._animations[0].stop(); // it will remove itself from the index
	}

	// Clear cache - this has the side-effect of unregistering keypaths from modified arrays.
	for ( keypath in this._cache ) {
		clearCache( this, keypath );
	}

	// Teardown any bindings
	while ( this._bound.length ) {
		this.unbind( this._bound.pop() );
	}

	// transition manager has finished its work
	this._transitionManager = previousTransitionManager;
	transitionManager.ready();
};
proto.toggleFullscreen = function () {
	if ( Ractive.isFullscreen( this.el ) ) {
		this.cancelFullscreen();
	} else {
		this.requestFullscreen();
	}
};
proto.unbind = function ( adaptor ) {
	var bound = this._bound, index;

	index = bound.indexOf( adaptor );

	if ( index !== -1 ) {
		bound.splice( index, 1 );
		adaptor.teardown( this );
	}
};
proto.update = function ( keypath, complete ) {
	var transitionManager, previousTransitionManager;

	if ( typeof keypath === 'function' ) {
		complete = keypath;
	}

	// manage transitions
	previousTransitionManager = this._transitionManager;
	this._transitionManager = transitionManager = makeTransitionManager( this, complete );

	clearCache( this, keypath || '' );
	notifyDependants( this, keypath || '' );

	processDeferredUpdates( this );

	// transition manager has finished its work
	this._transitionManager = previousTransitionManager;
	transitionManager.ready();

	if ( typeof keypath === 'string' ) {
		this.fire( 'update', keypath );
	} else {
		this.fire( 'update' );
	}

	return this;
};
adaptors.backbone = function ( model, path ) {
	var settingModel, settingView, setModel, setView, pathMatcher, pathLength, prefix;

	if ( path ) {
		path += '.';
		pathMatcher = new RegExp( '^' + path.replace( /\./g, '\\.' ) );
		pathLength = path.length;
	}


	return {
		init: function ( view ) {
			
			// if no path specified...
			if ( !path ) {
				setView = function ( model ) {
					if ( !settingModel ) {
						settingView = true;
						view.set( model.changed );
						settingView = false;
					}
				};

				setModel = function ( keypath, value ) {
					if ( !settingView ) {
						settingModel = true;
						model.set( keypath, value );
						settingModel = false;
					}
				};
			}

			else {
				prefix = function ( attrs ) {
					var attr, result;

					result = {};

					for ( attr in attrs ) {
						if ( hasOwn.call( attrs, attr ) ) {
							result[ path + attr ] = attrs[ attr ];
						}
					}

					return result;
				};

				setView = function ( model ) {
					if ( !settingModel ) {
						settingView = true;
						view.set( prefix( model.changed ) );
						settingView = false;
					}
				};

				setModel = function ( keypath, value ) {
					if ( !settingView ) {
						if ( pathMatcher.test( keypath ) ) {
							settingModel = true;
							model.set( keypath.substring( pathLength ), value );
							settingModel = false;
						}
					}
				};
			}

			model.on( 'change', setView );
			view.on( 'set', setModel );
			
			// initialise
			view.set( path ? prefix( model.attributes ) : model.attributes );
		},

		teardown: function ( view ) {
			model.off( 'change', setView );
			view.off( 'set', setModel );
		}
	};
};
adaptors.statesman = function ( model, path ) {
	var settingModel, settingView, setModel, setView, pathMatcher, pathLength, prefix;

	if ( path ) {
		path += '.';
		pathMatcher = new RegExp( '^' + path.replace( /\./g, '\\.' ) );
		pathLength = path.length;

		prefix = function ( attrs ) {
			var attr, result;

			if ( !attrs ) {
				return;
			}

			result = {};

			for ( attr in attrs ) {
				if ( hasOwn.call( attrs, attr ) ) {
					result[ path + attr ] = attrs[ attr ];
				}
			}

			return result;
		};
	}


	return {
		init: function ( view ) {
			
			var data;

			// if no path specified...
			if ( !path ) {
				setView = function ( change ) {
					if ( !settingModel ) {
						settingView = true;
						
						view.set( change );
						
						settingView = false;
					}
				};

				if ( view.twoway ) {
					setModel = function ( keypath, value ) {
						if ( !settingView ) {
							settingModel = true;
							model.set( keypath, value );
							settingModel = false;
						}
					};
				}
			}

			else {
				setView = function ( change ) {
					if ( !settingModel ) {
						settingView = true;
						
						change = prefix( change );
						view.set( change );
						
						settingView = false;
					}
				};

				if ( view.twoway ) {
					setModel = function ( keypath, value ) {
						if ( !settingView ) {
							if ( pathMatcher.test( keypath ) ) {
								settingModel = true;
								model.set( keypath.substring( pathLength ), value );
								settingModel = false;
							}
						}
					};
				}
			}

			model.on( 'change', setView );
	
			if ( view.twoway ) {
				view.on( 'set', setModel );
			}
			
			// initialise
			data = ( path ? prefix( model.get() ) : model.get() );

			if ( data ) {
				view.set( path ? prefix( model.get() ) : model.get() );
			}
		},

		teardown: function ( view ) {
			model.off( 'change', setView );
			view.off( 'set', setModel );
		}
	};
};
// These are a subset of the easing equations found at
// https://raw.github.com/danro/easing-js - license info
// follows:

// --------------------------------------------------
// easing.js v0.5.4
// Generic set of easing functions with AMD support
// https://github.com/danro/easing-js
// This code may be freely distributed under the MIT license
// http://danro.mit-license.org/
// --------------------------------------------------
// All functions adapted from Thomas Fuchs & Jeremy Kahn
// Easing Equations (c) 2003 Robert Penner, BSD license
// https://raw.github.com/danro/easing-js/master/LICENSE
// --------------------------------------------------

// In that library, the functions named easeIn, easeOut, and
// easeInOut below are named easeInCubic, easeOutCubic, and
// (you guessed it) easeInOutCubic.
//
// You can add additional easing functions to this list, and they
// will be globally available.

easing = {
	linear: function ( pos ) { return pos; },
	easeIn: function ( pos ) { return Math.pow( pos, 3 ); },
	easeOut: function ( pos ) { return ( Math.pow( ( pos - 1 ), 3 ) + 1 ); },
	easeInOut: function ( pos ) {
		if ( ( pos /= 0.5 ) < 1 ) { return ( 0.5 * Math.pow( pos, 3 ) ); }
		return ( 0.5 * ( Math.pow( ( pos - 2 ), 3 ) + 2 ) );
	}
};
eventDefinitions.hover = function ( node, fire ) {
	var mouseoverHandler, mouseoutHandler;

	mouseoverHandler = function ( event ) {
		fire({
			node: node,
			original: event,
			hover: true
		});
	};

	mouseoutHandler = function ( event ) {
		fire({
			node: node,
			original: event,
			hover: false
		});
	};

	node.addEventListener( 'mouseover', mouseoverHandler );
	node.addEventListener( 'mouseout', mouseoutHandler );

	return {
		teardown: function () {
			node.removeEventListener( 'mouseover', mouseoverHandler );
			node.removeEventListener( 'mouseout', mouseoutHandler );
		}
	};
};
(function () {

	var makeKeyDefinition = function ( code ) {
		return function ( node, fire ) {
			var keydownHandler;

			node.addEventListener( 'keydown', keydownHandler = function ( event ) {
				var which = event.which || event.keyCode;

				if ( which === code ) {
					event.preventDefault();

					fire({
						node: node,
						original: event
					});
				}
			});

			return {
				teardown: function () {
					node.removeEventListener( keydownHandler );
				}
			};
		};
	};

	eventDefinitions.enter = makeKeyDefinition( 13 );
	eventDefinitions.tab = makeKeyDefinition( 9 );
	eventDefinitions.escape = makeKeyDefinition( 27 );
	eventDefinitions.space = makeKeyDefinition( 32 );

}());
eventDefinitions.tap = function ( node, fire ) {
	var mousedown, touchstart, distanceThreshold, timeThreshold;

	distanceThreshold = 5; // maximum pixels pointer can move before cancel
	timeThreshold = 400;   // maximum milliseconds between down and up before cancel

	mousedown = function ( event ) {
		var currentTarget, x, y, up, move, cancel;

		x = event.clientX;
		y = event.clientY;
		currentTarget = this;

		up = function ( event ) {
			fire({
				node: currentTarget,
				original: event
			});

			cancel();
		};

		move = function ( event ) {
			if ( ( Math.abs( event.clientX - x ) >= distanceThreshold ) || ( Math.abs( event.clientY - y ) >= distanceThreshold ) ) {
				cancel();
			}
		};

		cancel = function () {
			doc.removeEventListener( 'mousemove', move );
			doc.removeEventListener( 'mouseup', up );
		};

		doc.addEventListener( 'mousemove', move );
		doc.addEventListener( 'mouseup', up );

		setTimeout( cancel, timeThreshold );
	};

	node.addEventListener( 'mousedown', mousedown );


	touchstart = function ( event ) {
		var currentTarget, x, y, touch, finger, move, up, cancel;

		if ( event.touches.length !== 1 ) {
			return;
		}

		touch = event.touches[0];

		x = touch.clientX;
		y = touch.clientY;
		currentTarget = this;

		finger = touch.identifier;

		up = function ( event ) {
			var touch;

			touch = event.changedTouches[0];
			if ( touch.identifier !== finger ) {
				cancel();
			}

			event.preventDefault();  // prevent compatibility mouse event
			fire({
				node: currentTarget,
				original: event
			});
			
			cancel();
		};

		move = function ( event ) {
			var touch;

			if ( event.touches.length !== 1 || event.touches[0].identifier !== finger ) {
				cancel();
			}

			touch = event.touches[0];
			if ( ( Math.abs( touch.clientX - x ) >= distanceThreshold ) || ( Math.abs( touch.clientY - y ) >= distanceThreshold ) ) {
				cancel();
			}
		};

		cancel = function () {
			window.removeEventListener( 'touchmove', move );
			window.removeEventListener( 'touchend', up );
			window.removeEventListener( 'touchcancel', cancel );
		};

		window.addEventListener( 'touchmove', move );
		window.addEventListener( 'touchend', up );
		window.addEventListener( 'touchcancel', cancel );

		setTimeout( cancel, timeThreshold );
	};

	node.addEventListener( 'touchstart', touchstart );


	return {
		teardown: function () {
			node.removeEventListener( 'mousedown', mousedown );
			node.removeEventListener( 'touchstart', touchstart );
		}
	};
};
(function () {

	var fillGaps,
		clone,
		augment,

		inheritFromParent,
		wrapMethod,
		inheritFromChildProps,
		conditionallyParseTemplate,
		extractInlinePartials,
		conditionallyParsePartials,
		initChildInstance,

		extendable,
		inheritable,
		blacklist;

	extend = function ( childProps ) {

		var Parent, Child, key, template, partials, partial, member;

		Parent = this;

		// create Child constructor
		Child = function ( options ) {
			initChildInstance( this, Child, options || {});
		};

		Child.prototype = create( Parent.prototype );

		// inherit options from parent, if we're extending a subclass
		if ( Parent !== Ractive ) {
			inheritFromParent( Child, Parent );
		}

		// apply childProps
		inheritFromChildProps( Child, childProps );

		// parse template and any partials that need it
		conditionallyParseTemplate( Child );
		extractInlinePartials( Child, childProps );
		conditionallyParsePartials( Child );
		
		Child.extend = Parent.extend;

		return Child;
	};

	extendable = [ 'data', 'partials', 'transitions', 'eventDefinitions' ];
	inheritable = [ 'el', 'template', 'complete', 'modifyArrays', 'twoway', 'lazy', 'append', 'preserveWhitespace', 'sanitize', 'noIntro', 'transitionsEnabled' ];
	blacklist = extendable.concat( inheritable );

	inheritFromParent = function ( Child, Parent ) {
		extendable.forEach( function ( property ) {
			if ( Parent[ property ] ) {
				Child[ property ] = clone( Parent[ property ] );
			}
		});

		inheritable.forEach( function ( property ) {
			if ( Parent[ property ] !== undefined ) {
				Child[ property ] = Parent[ property ];
			}
		});
	};

	wrapMethod = function ( method, superMethod ) {
		if ( /_super/.test( method ) ) {
			return function () {
				var _super = this._super;
				this._super = superMethod;

				method.apply( this, arguments );

				this._super = _super;
			};
		}

		else {
			return method;
		}
	};

	inheritFromChildProps = function ( Child, childProps ) {
		var key, member;

		extendable.forEach( function ( property ) {
			var value = childProps[ property ];

			if ( value ) {
				if ( Child[ property ] ) {
					augment( Child[ property ], value );
				}

				else {
					Child[ property ] = value;
				}
			}
		});

		inheritable.forEach( function ( property ) {
			if ( childProps[ property ] !== undefined ) {
				Child[ property ] = childProps[ property ];
			}
		});

		// Blacklisted properties don't extend the child, as they are part of the initialisation options
		for ( key in childProps ) {
			if ( hasOwn.call( childProps, key ) && !hasOwn.call( Child.prototype, key ) && blacklist.indexOf( key ) === -1 ) {
				member = childProps[ key ];

				// if this is a method that overwrites a prototype method, we may need
				// to wrap it
				if ( typeof member === 'function' && typeof Child.prototype[ key ] === 'function' ) {
					Child.prototype[ key ] = wrapMethod( member, Child.prototype[ key ] );
				} else {
					Child.prototype[ key ] = member;
				}
			}
		}
	};

	conditionallyParseTemplate = function ( Child ) {
		var templateEl;

		if ( typeof Child.template === 'string' ) {
			if ( !Ractive.parse ) {
				throw new Error( missingParser );
			}

			if ( Child.template.charAt( 0 ) === '#' && doc ) {
				templateEl = doc.getElementById( Child.template.substring( 1 ) );
				if ( templateEl && templateEl.tagName === 'SCRIPT' ) {
					Child.template = Ractive.parse( templateEl.innerHTML, Child );
				} else {
					throw new Error( 'Could not find template element (' + Child.template + ')' );
				}
			} else {
				Child.template = Ractive.parse( Child.template, Child ); // all the relevant options are on Child
			}
		}
	};

	extractInlinePartials = function ( Child, childProps ) {
		// does our template contain inline partials?
		if ( isObject( Child.template ) ) {
			if ( !Child.partials ) {
				Child.partials = {};
			}

			// get those inline partials
			augment( Child.partials, Child.template.partials );

			// but we also need to ensure that any explicit partials override inline ones
			if ( childProps.partials ) {
				augment( Child.partials, childProps.partials );
			}

			// move template to where it belongs
			Child.template = Child.template.template;
		}
	};

	conditionallyParsePartials = function ( Child ) {
		var key, partial;

		// Parse partials, if necessary
		if ( Child.partials ) {
			for ( key in Child.partials ) {
				if ( hasOwn.call( Child.partials, key ) ) {
					if ( typeof Child.partials[ key ] === 'string' ) {
						if ( !Ractive.parse ) {
							throw new Error( missingParser );
						}

						partial = Ractive.parse( Child.partials[ key ], Child );
					} else {
						partial = Child.partials[ key ];
					}

					Child.partials[ key ] = partial;
				}
			}
		}
	};

	initChildInstance = function ( child, Child, options ) {
		var key, i, optionName;

		// Add template to options, if necessary
		if ( !options.template && Child.template ) {
			options.template = Child.template;
		}

		extendable.forEach( function ( property ) {
			if ( !options[ property ] ) {
				if ( Child[ property ] ) {
					options[ property ] = clone( Child[ property ] );
				}
			} else {
				fillGaps( options[ property ], Child[ property ] );
			}
		});
		
		inheritable.forEach( function ( property ) {
			if ( options[ property ] === undefined && Child[ property ] !== undefined ) {
				options[ property ] = Child[ property ];
			}
		});

		Ractive.call( child, options );

		if ( child.init ) {
			child.init.call( child, options );
		}
	};

	fillGaps = function ( target, source ) {
		var key;

		for ( key in source ) {
			if ( hasOwn.call( source, key ) && !hasOwn.call( target, key ) ) {
				target[ key ] = source[ key ];
			}
		}
	};

	clone = function ( source ) {
		var target = {}, key;

		for ( key in source ) {
			if ( hasOwn.call( source, key ) ) {
				target[ key ] = source[ key ];
			}
		}

		return target;
	};

	augment = function ( target, source ) {
		var key;

		for ( key in source ) {
			if ( hasOwn.call( source, key ) ) {
				target[ key ] = source[ key ];
			}
		}
	};

}());
// TODO short circuit values that stay the same
interpolate = function ( from, to ) {
	if ( isNumeric( from ) && isNumeric( to ) ) {
		return Ractive.interpolators.number( +from, +to );
	}

	if ( isArray( from ) && isArray( to ) ) {
		return Ractive.interpolators.array( from, to );
	}

	if ( isObject( from ) && isObject( to ) ) {
		return Ractive.interpolators.object( from, to );
	}

	return function () { return to; };
};
interpolators = {
	number: function ( from, to ) {
		var delta = to - from;

		if ( !delta ) {
			return function () { return from; };
		}

		return function ( t ) {
			return from + ( t * delta );
		};
	},

	array: function ( from, to ) {
		var intermediate, interpolators, len, i;

		intermediate = [];
		interpolators = [];

		i = len = Math.min( from.length, to.length );
		while ( i-- ) {
			interpolators[i] = Ractive.interpolate( from[i], to[i] );
		}

		// surplus values - don't interpolate, but don't exclude them either
		for ( i=len; i<from.length; i+=1 ) {
			intermediate[i] = from[i];
		}

		for ( i=len; i<to.length; i+=1 ) {
			intermediate[i] = to[i];
		}

		return function ( t ) {
			var i = len;

			while ( i-- ) {
				intermediate[i] = interpolators[i]( t );
			}

			return intermediate;
		};
	},

	object: function ( from, to ) {
		var properties = [], len, interpolators, intermediate, prop;

		intermediate = {};
		interpolators = {};

		for ( prop in from ) {
			if ( hasOwn.call( from, prop ) ) {
				if ( hasOwn.call( to, prop ) ) {
					properties[ properties.length ] = prop;
					interpolators[ prop ] = Ractive.interpolate( from[ prop ], to[ prop ] );
				}

				else {
					intermediate[ prop ] = from[ prop ];
				}
			}
		}

		for ( prop in to ) {
			if ( hasOwn.call( to, prop ) && !hasOwn.call( from, prop ) ) {
				intermediate[ prop ] = to[ prop ];
			}
		}

		len = properties.length;

		return function ( t ) {
			var i = len, prop;

			while ( i-- ) {
				prop = properties[i];

				intermediate[ prop ] = interpolators[ prop ]( t );
			}

			return intermediate;
		};
	}
};
var defaultOptions = createFromNull();

defineProperties( defaultOptions, {
	preserveWhitespace: { enumerable: true, value: false },
	append:             { enumerable: true, value: false },
	twoway:             { enumerable: true, value: true  },
	modifyArrays:       { enumerable: true, value: true  },
	data:               { enumerable: true, value: {}    },
	lazy:               { enumerable: true, value: false },
	debug:              { enumerable: true, value: false },
	transitions:        { enumerable: true, value: {}    },
	eventDefinitions:   { enumerable: true, value: {}    },
	noIntro:            { enumerable: true, value: false },
	transitionsEnabled: { enumerable: true, value: true  }
});

Ractive = function ( options ) {

	var key, partial, i, template, templateEl, parsedTemplate;

	// Options
	// -------
	for ( key in defaultOptions ) {
		if ( !hasOwn.call( options, key ) ) {
			options[ key ] = ( typeof defaultOptions[ key ] === 'object' ? {} : defaultOptions[ key ] );
		}
	}


	// Initialization
	// --------------

	// We use Object.defineProperties (where possible) as these should be read-only
	defineProperties( this, {
		// Generate a unique identifier, for places where you'd use a weak map if it
		// existed
		_guid: {
			value: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				var r, v;

				r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
				return v.toString(16);
			})
		},

		// events
		_subs: { value: createFromNull() },

		// cache
		_cache: { value: {} }, // we need to be able to use hasOwnProperty, so can't inherit from null
		_cacheMap: { value: createFromNull() },

		// dependency graph
		_deps: { value: [] },
		_depsMap: { value: createFromNull() },

		// unresolved dependants
		_pendingResolution: { value: [] },

		// Create arrays for deferred attributes and evaluators
		_defAttrs: { value: [] },
		_defEvals: { value: [] },

		// Cache proxy event handlers - allows efficient reuse
		_proxies: { value: createFromNull() },
		_customProxies: { value: createFromNull() },

		// Keep a list of used evaluators, so we don't duplicate them
		_evaluators: { value: createFromNull() },

		// bindings
		_bound: { value: [] },

		// transition manager
		_transitionManager: { value: null, writable: true },

		// animations (so we can stop any in progress at teardown)
		_animations: { value: [] },

		// nodes registry
		nodes: { value: {} }
	});

	// options
	this.modifyArrays = options.modifyArrays;
	this.twoway = options.twoway;
	this.lazy = options.lazy;
	this.debug = options.debug;

	if ( options.el ) {
		this.el = getEl( options.el );
		if ( !this.el && this.debug ) {
			throw new Error( 'Could not find container element' );
		}
	}

	// add data
	this.data = options.data || {};
	

	// Partials registry
	this.partials = {};

	// Transition registry
	this.transitions = options.transitions;

	// Instance-specific event definitions registry
	this.eventDefinitions = options.eventDefinitions;

	// Set up bindings
	if ( options.bindings ) {
		if ( isArray( options.bindings ) ) {
			for ( i=0; i<options.bindings.length; i+=1 ) {
				this.bind( options.bindings[i] );
			}
		} else {
			this.bind( options.bindings );
		}
	}


	// Parse template, if necessary
	template = options.template;

	if ( typeof template === 'string' ) {
		if ( !Ractive.parse ) {
			throw new Error( missingParser );
		}

		if ( template.charAt( 0 ) === '#' && doc ) {
			// assume this is an ID of a <script type='text/ractive'> tag
			templateEl = doc.getElementById( template.substring( 1 ) );
			if ( templateEl ) {
				parsedTemplate = Ractive.parse( templateEl.innerHTML, options );
			}

			else {
				throw new Error( 'Could not find template element (' + template + ')' );
			}
		}

		else {
			parsedTemplate = Ractive.parse( template, options );
		}
	} else {
		parsedTemplate = template;
	}

	// deal with compound template
	if ( isObject( parsedTemplate ) ) {
		this.partials = parsedTemplate.partials;
		parsedTemplate = parsedTemplate.template;
	}

	// If the template was an array with a single string member, that means
	// we can use innerHTML - we just need to unpack it
	if ( parsedTemplate && ( parsedTemplate.length === 1 ) && ( typeof parsedTemplate[0] === 'string' ) ) {
		parsedTemplate = parsedTemplate[0];
	}

	this.template = parsedTemplate;


	// If we were given unparsed partials, parse them
	if ( options.partials ) {
		for ( key in options.partials ) {
			if ( hasOwn.call( options.partials, key ) ) {
				partial = options.partials[ key ];

				if ( typeof partial === 'string' ) {
					if ( !Ractive.parse ) {
						throw new Error( missingParser );
					}

					partial = Ractive.parse( partial, options );
				}

				this.partials[ key ] = partial;
			}
		}
	}

	// Unpack string-based partials, if necessary
	for ( key in this.partials ) {
		if ( hasOwn.call( this.partials, key ) && this.partials[ key ].length === 1 && typeof this.partials[ key ][0] === 'string' ) {
			this.partials[ key ] = this.partials[ key ][0];
		}
	}

	// temporarily disable transitions, if noIntro flag is set
	this.transitionsEnabled = ( options.noIntro ? false : options.transitionsEnabled );

	render( this, { el: this.el, append: options.append, complete: options.complete });

	// reset transitionsEnabled
	this.transitionsEnabled = options.transitionsEnabled;
};

(function () {

	var getOriginalComputedStyles, setStyle, augment, makeTransition, transform, transformsEnabled, inside, outside;

	// no point executing this code on the server
	if ( !doc ) {
		return;
	}

	getOriginalComputedStyles = function ( computedStyle, properties ) {
		var original = {}, i;

		i = properties.length;
		while ( i-- ) {
			original[ properties[i] ] = computedStyle[ properties[i] ];
		}

		return original;
	};

	setStyle = function ( node, properties, map, params ) {
		var i = properties.length, prop;

		while ( i-- ) {
			prop = properties[i];
			if ( map && map[ prop ] ) {
				if ( typeof map[ prop ] === 'function' ) {
					node.style[ prop ] = map[ prop ]( params );
				} else {
					node.style[ prop ] = map[ prop ];
				}
			}

			else {
				node.style[ prop ] = 0;
			}
		}
	};

	augment = function ( target, source ) {
		var key;

		if ( !source ) {
			return target;
		}

		for ( key in source ) {
			if ( hasOwn.call( source, key ) ) {
				target[ key ] = source[ key ];
			}
		}

		return target;
	};

	if ( cssTransitionsEnabled ) {
		makeTransition = function ( properties, defaults, outside, inside ) {
			if ( typeof properties === 'string' ) {
				properties = [ properties ];
			}

			return function ( node, complete, params, info, isIntro ) {
				var transitionEndHandler, transitionStyle, computedStyle, originalComputedStyles, startTransition, originalStyle, originalOpacity, targetOpacity, duration, delay, start, end, source, target, positionStyle, visibilityStyle, stylesToRemove;

				params = parseTransitionParams( params );
				
				duration = params.duration || defaults.duration;
				easing = hyphenate( params.easing || defaults.easing );
				delay = ( params.delay || defaults.delay || 0 ) + ( ( params.stagger || defaults.stagger || 0 ) * info.i );

				start = ( isIntro ? outside : inside );
				end = ( isIntro ? inside : outside );

				computedStyle = window.getComputedStyle( node );
				originalStyle = node.getAttribute( 'style' );

				// if this is an intro, we need to transition TO the original styles
				if ( isIntro ) {
					// hide, to avoid flashes
					positionStyle = node.style.position;
					visibilityStyle = node.style.visibility;
					node.style.position = 'absolute';
					node.style.visibility = 'hidden';

					// we need to wait a beat before we can actually get values from computedStyle.
					// Yeah, I know, WTF browsers
					setTimeout( function () {
						var i, prop;

						originalComputedStyles = getOriginalComputedStyles( computedStyle, properties );
						
						start = outside;
						end = augment( originalComputedStyles, inside );

						// starting style
						node.style.position = positionStyle;
						node.style.visibility = visibilityStyle;
						
						setStyle( node, properties, start, params );

						setTimeout( startTransition, 0 );
					}, delay );
				}

				// otherwise we need to transition FROM them
				else {
					setTimeout( function () {
						var i, prop;

						originalComputedStyles = getOriginalComputedStyles( computedStyle, properties );

						start = augment( originalComputedStyles, inside );
						end = outside;

						// ending style
						setStyle( node, properties, start, params );

						setTimeout( startTransition, 0 );
					}, delay );
				}

				startTransition = function () {
					var i, prop;

					node.style[ transition + 'Duration' ] = ( duration / 1000 ) + 's';
					node.style[ transition + 'Properties' ] = properties.map( hyphenate ).join( ',' );
					node.style[ transition + 'TimingFunction' ] = easing;

					transitionEndHandler = function ( event ) {
						node.removeEventListener( transitionend, transitionEndHandler );

						if ( isIntro ) {
							node.setAttribute( 'style', originalStyle || '' );
						}

						complete();
					};
					
					node.addEventListener( transitionend, transitionEndHandler );

					setStyle( node, properties, end, params );
				};
			};
		};

		transitions.slide = makeTransition([
			'height',
			'borderTopWidth',
			'borderBottomWidth',
			'paddingTop',
			'paddingBottom',
			'overflowY'
		], { duration: 400, easing: 'easeInOut' }, { overflowY: 'hidden' }, { overflowY: 'hidden' });

		transitions.fade = makeTransition( 'opacity', {
			duration: 300,
			easing: 'linear'
		});

		transitions.fly = makeTransition([ 'opacity', 'left', 'position' ], {
			duration: 400, easing: 'easeOut'
		}, { position: 'relative', left: '-500px' }, { position: 'relative', left: 0 });
	}

	

}());
var parseTransitionParams = function ( params ) {
	if ( params === 'fast' ) {
		return { duration: 200 };
	}

	if ( params === 'slow' ) {
		return { duration: 600 };
	}

	if ( isNumeric( params ) ) {
		return { duration: +params };
	}

	return params || {};
};
(function ( transitions ) {

	var typewriter, typewriteNode, typewriteTextNode;

	if ( !doc ) {
		return;
	}

	typewriteNode = function ( node, complete, interval ) {
		var children, next, hideData;

		if ( node.nodeType === 3 ) {
			typewriteTextNode( node, complete, interval );
			return;
		}

		children = Array.prototype.slice.call( node.childNodes );

		next = function () {
			if ( !children.length ) {
				complete();
				return;
			}

			typewriteNode( children.shift(), next, interval );
		};

		next();
	};

	typewriteTextNode = function ( node, complete, interval ) {
		var str, len, loop, i;

		// text node
		str = node._hiddenData;
		len = str.length;

		if ( !len ) {
			complete();
			return;
		}

		i = 0;

		loop = setInterval( function () {
			var substr, remaining, match, remainingNonWhitespace, filler;

			substr = str.substr( 0, i );
			remaining = str.substring( i );

			match = /^\w+/.exec( remaining );
			remainingNonWhitespace = ( match ? match[0].length : 0 );

			// add some non-breaking whitespace corresponding to the remaining length of the
			// current word (only really works with monospace fonts, but better than nothing)
			filler = new Array( remainingNonWhitespace + 1 ).join( '\u00a0' );

			node.data = substr + filler;
			if ( i === len ) {
				clearInterval( loop );
				delete node._hiddenData;
				complete();
			}

			i += 1;
		}, interval );
	};

	typewriter = function ( node, complete, params, info, isIntro ) {
		var interval, style, computedStyle, hideData;

		params = parseTransitionParams( params );

		interval = params.interval || ( params.speed ? 1000 / params.speed : ( params.duration ? node.textContent.length / params.duration : 4 ) );
		
		style = node.getAttribute( 'style' );
		computedStyle = window.getComputedStyle( node );

		node.style.visibility = 'hidden';

		setTimeout( function () {
			var computedHeight, computedWidth, computedVisibility;

			computedWidth = computedStyle.width;
			computedHeight = computedStyle.height;
			computedVisibility = computedStyle.visibility;

			hideData( node );

			setTimeout( function () {
				node.style.width = computedWidth;
				node.style.height = computedHeight;
				node.style.visibility = 'visible';

				typewriteNode( node, function () {
					node.setAttribute( 'style', style || '' );
					complete();
				}, interval );
			}, params.delay || 0 );
		});

		hideData = function ( node ) {
			var children, i;

			if ( node.nodeType === 3 ) {
				node._hiddenData = '' + node.data;
				node.data = '';
				
				return;
			}

			children = Array.prototype.slice.call( node.childNodes );
			i = children.length;
			while ( i-- ) {
				hideData( children[i] );
			}
		};
	};

	transitions.typewriter = typewriter;

}( transitions ));
(function ( Ractive ) {

	var requestFullscreen, cancelFullscreen, fullscreenElement, testDiv;

	if ( !doc ) {
		return;
	}

	Ractive.fullscreenEnabled = doc.fullscreenEnabled || doc.mozFullScreenEnabled || doc.webkitFullscreenEnabled;

	if ( !Ractive.fullscreenEnabled ) {
		Ractive.requestFullscreen = Ractive.cancelFullscreen = noop;
		return;
	}

	testDiv = doc.createElement( 'div' );

	// get prefixed name of requestFullscreen method
	if ( testDiv.requestFullscreen ) {
		requestFullscreen = 'requestFullscreen';
	} else if ( testDiv.mozRequestFullScreen ) {
		requestFullscreen = 'mozRequestFullScreen';
	} else if ( testDiv.webkitRequestFullscreen ) {
		requestFullscreen = 'webkitRequestFullscreen';
	}

	Ractive.requestFullscreen = function ( el ) {
		if ( el[ requestFullscreen ] ) {
			el[ requestFullscreen ]();
		}
	};

	// get prefixed name of cancelFullscreen method
	if ( doc.cancelFullscreen ) {
		cancelFullscreen = 'cancelFullscreen';
	} else if ( doc.mozCancelFullScreen ) {
		cancelFullscreen = 'mozCancelFullScreen';
	} else if ( doc.webkitCancelFullScreen ) {
		cancelFullscreen = 'webkitCancelFullScreen';
	}

	Ractive.cancelFullscreen = function () {
		doc[ cancelFullscreen ]();
	};

	// get prefixed name of fullscreenElement property
	if ( doc.fullscreenElement !== undefined ) {
		fullscreenElement = 'fullscreenElement';
	} else if ( doc.mozFullScreenElement !== undefined ) {
		fullscreenElement = 'mozFullScreenElement';
	} else if ( doc.webkitFullscreenElement !== undefined ) {
		fullscreenElement = 'webkitFullscreenElement';
	}

	Ractive.isFullscreen = function ( el ) {
		return el === doc[ fullscreenElement ];
	};

}( Ractive ));
Animation = function ( options ) {
	var key;

	this.startTime = Date.now();

	// from and to
	for ( key in options ) {
		if ( hasOwn.call( options, key ) ) {
			this[ key ] = options[ key ];
		}
	}

	this.interpolator = Ractive.interpolate( this.from, this.to );
	this.running = true;
};

Animation.prototype = {
	tick: function () {
		var elapsed, t, value, timeNow, index;

		if ( this.running ) {
			timeNow = Date.now();
			elapsed = timeNow - this.startTime;

			if ( elapsed >= this.duration ) {
				this.root.set( this.keypath, this.to );

				if ( this.step ) {
					this.step( 1, this.to );
				}

				if ( this.complete ) {
					this.complete( 1, this.to );
				}

				index = this.root._animations.indexOf( this );

				// TODO remove this check, once we're satisifed this never happens!
				if ( index === -1 && console && console.warn ) {
					console.warn( 'Animation was not found' );
				}

				this.root._animations.splice( index, 1 );

				this.running = false;
				return false;
			}

			t = this.easing ? this.easing ( elapsed / this.duration ) : ( elapsed / this.duration );
			value = this.interpolator( t );

			this.root.set( this.keypath, value );

			if ( this.step ) {
				this.step( t, value );
			}

			return true;
		}

		return false;
	},

	stop: function () {
		var index;

		this.running = false;

		index = this.root._animations.indexOf( this );

		// TODO remove this check, once we're satisifed this never happens!
		if ( index === -1 && console && console.warn ) {
			console.warn( 'Animation was not found' );
		}

		this.root._animations.splice( index, 1 );
	}
};
animationCollection = {
	animations: [],

	tick: function () {
		var i, animation;

		for ( i=0; i<this.animations.length; i+=1 ) {
			animation = this.animations[i];

			if ( !animation.tick() ) {
				// animation is complete, remove it from the stack, and decrement i so we don't miss one
				this.animations.splice( i--, 1 );
			}
		}

		if ( this.animations.length ) {
			requestAnimationFrame( this.boundTick );
		} else {
			this.running = false;
		}
	},

	// bind method to animationCollection
	boundTick: function () {
		animationCollection.tick();
	},

	push: function ( animation ) {
		this.animations[ this.animations.length ] = animation;

		if ( !this.running ) {
			this.running = true;
			this.tick();
		}
	}
};
// https://gist.github.com/paulirish/1579671
(function( vendors, lastTime, global ) {
	
	var x, setTimeout;

	if ( global.requestAnimationFrame ) {
		requestAnimationFrame = global.requestAnimationFrame;
		return;
	}

	for ( x = 0; x < vendors.length && !requestAnimationFrame; ++x ) {
		requestAnimationFrame = global[vendors[x]+'RequestAnimationFrame'];
	}

	if ( !requestAnimationFrame ) {
		setTimeout = global.setTimeout;

		requestAnimationFrame = function(callback) {
			var currTime, timeToCall, id;
			
			currTime = Date.now();
			timeToCall = Math.max( 0, 16 - (currTime - lastTime ) );
			id = setTimeout( function() { callback(currTime + timeToCall); }, timeToCall );
			
			lastTime = currTime + timeToCall;
			return id;
		};
	}
	
}( ['ms', 'moz', 'webkit', 'o'], 0, global ));
(function () {

	var notifyArrayDependants,

		wrapArray,
		unwrapArray,
		WrappedArrayProto,
		testObj,
		mutatorMethods;


	// Register a keypath to this array. When any of this array's mutator methods are called,
	// it will `set` that keypath on the given Ractive instance
	registerKeypathToArray = function ( array, keypath, root ) {
		var roots, keypathsByGuid, rootIndex, keypaths;

		// If this array hasn't been wrapped, we need to wrap it
		if ( !array._ractive ) {
			defineProperty( array, '_ractive', {
				value: {
					roots: [ root ], // there may be more than one Ractive instance depending on this
					keypathsByGuid: {}
				},
				configurable: true
			});

			array._ractive.keypathsByGuid[ root._guid ] = [ keypath ];

			wrapArray( array );
		}

		else {
			roots = array._ractive.roots;
			keypathsByGuid = array._ractive.keypathsByGuid;

			// Does this Ractive instance currently depend on this array?
			// If not, associate them
			if ( !keypathsByGuid[ root._guid ] ) {
				roots[ roots.length ] = root;
				keypathsByGuid[ root._guid ] = [];
			}

			keypaths = keypathsByGuid[ root._guid ];

			// If the current keypath isn't among them, add it
			if ( keypaths.indexOf( keypath ) === -1 ) {
				keypaths[ keypaths.length ] = keypath;
			}
		}
	};


	// Unregister keypath from array
	unregisterKeypathFromArray = function ( array, keypath, root ) {
		var roots, keypathsByGuid, rootIndex, keypaths, keypathIndex;

		if ( !array._ractive ) {
			throw new Error( 'Attempted to remove keypath from non-wrapped array. This error is unexpected - please send a bug report to @rich_harris' );
		}

		roots = array._ractive.roots;
		keypathsByGuid = array._ractive.keypathsByGuid;

		if ( !keypathsByGuid[ root._guid ] ) {
			throw new Error( 'Ractive instance was not listed as a dependent of this array. This error is unexpected - please send a bug report to @rich_harris' );
		}

		keypaths = keypathsByGuid[ root._guid ];
		keypathIndex = keypaths.indexOf( keypath );

		if ( keypathIndex === -1 ) {
			throw new Error( 'Attempted to unlink non-linked keypath from array. This error is unexpected - please send a bug report to @rich_harris' );
		}

		keypaths.splice( keypathIndex, 1 );

		if ( !keypaths.length ) {
			roots.splice( roots.indexOf( root ), 1 );
			keypathsByGuid[ root._guid ] = null;
		}

		if ( !roots.length ) {
			unwrapArray( array ); // It's good to clean up after ourselves
		}
	};


	notifyArrayDependants = function ( array, methodName, args ) {
		var processRoots,
			processRoot,
			processKeypaths,
			processKeypath,
			queueAllDependants,
			queueDependants,
			keypathsByGuid;

		keypathsByGuid = array._ractive.keypathsByGuid;

		processRoots = function ( roots ) {
			var i = roots.length;
			while ( i-- ) {
				processRoot( roots[i] );
			}
		};

		processRoot = function ( root ) {
			var previousTransitionManager = root._transitionManager, transitionManager;

			root._transitionManager = transitionManager = makeTransitionManager( root, noop );
			processKeypaths( root, keypathsByGuid[ root._guid ] );
			root._transitionManager = previousTransitionManager;

			transitionManager.ready();
		};

		processKeypaths = function ( root, keypaths ) {
			var i = keypaths.length;
			while ( i-- ) {
				processKeypath( root, keypaths[i] );
			}
		};

		processKeypath = function ( root, keypath ) {
			var depsByKeypath, deps, keys, upstreamQueue, smartUpdateQueue, dumbUpdateQueue, i, j, item;

			// We don't do root.set(), because we don't want to update DOM sections
			// using the normal method - we want to do a smart update whereby elements
			// are removed from the right place. But we do need to clear the cache
			clearCache( root, keypath );

			// find dependants. If any are DOM sections, we do a smart update
			// rather than a ractive.set() blunderbuss
			smartUpdateQueue = [];
			dumbUpdateQueue = [];

			for ( i=0; i<root._deps.length; i+=1 ) { // we can't cache root._deps.length as it may change!
				depsByKeypath = root._deps[i];

				if ( !depsByKeypath ) {
					continue;
				}

				deps = depsByKeypath[ keypath ];
				
				if ( deps ) {
					queueDependants( root, keypath, deps, smartUpdateQueue, dumbUpdateQueue );

					// we may have some deferred evaluators to process
					processDeferredUpdates( root );
					
					while ( smartUpdateQueue.length ) {
						smartUpdateQueue.pop().smartUpdate( methodName, args );
					}

					while ( dumbUpdateQueue.length ) {
						dumbUpdateQueue.pop().update();
					}
				}
			}

			// we may have some deferred attributes to process
			processDeferredUpdates( root );

			// Finally, notify direct dependants of upstream keypaths...
			upstreamQueue = [];

			keys = splitKeypath( keypath );
			while ( keys.length ) {
				keys.pop();
				upstreamQueue[ upstreamQueue.length ] = keys.join( '.' );
			}

			notifyMultipleDependants( root, upstreamQueue, true );

			// length property has changed - notify dependants
			// TODO in some cases (e.g. todo list example, when marking all as complete, then
			// adding a new item (which should deactivate the 'all complete' checkbox
			// but doesn't) this needs to happen before other updates. But doing so causes
			// other mental problems. not sure what's going on...
			notifyDependants( root, keypath + '.length', true );
		};

		// TODO can we get rid of this whole queueing nonsense?
		queueDependants = function ( root, keypath, deps, smartUpdateQueue, dumbUpdateQueue ) {
			var k, dependant;

			k = deps.length;
			while ( k-- ) {
				dependant = deps[k];

				// references need to get processed before mustaches
				if ( dependant.type === REFERENCE ) {
					dependant.update();
					//dumbUpdateQueue[ dumbUpdateQueue.length ] = dependant;
				}

				// is this a DOM section?
				else if ( dependant.keypath === keypath && dependant.type === SECTION /*&& dependant.parentNode*/ ) {
					smartUpdateQueue[ smartUpdateQueue.length ] = dependant;

				} else {
					dumbUpdateQueue[ dumbUpdateQueue.length ] = dependant;
				}
			}
		};

		processRoots( array._ractive.roots );
	};





		
	WrappedArrayProto = [];
	mutatorMethods = [ 'pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift' ];

	mutatorMethods.forEach( function ( methodName ) {
		var method = function () {
			var result = Array.prototype[ methodName ].apply( this, arguments );

			this._ractive.setting = true;
			notifyArrayDependants( this, methodName, arguments );
			this._ractive.setting = false;

			return result;
		};

		defineProperty( WrappedArrayProto, methodName, {
			value: method
		});
	});

	
	// can we use prototype chain injection?
	// http://perfectionkills.com/how-ecmascript-5-still-does-not-allow-to-subclass-an-array/#wrappers_prototype_chain_injection
	testObj = {};
	if ( testObj.__proto__ ) {
		// yes, we can
		wrapArray = function ( array ) {
			array.__proto__ = WrappedArrayProto;
		};

		unwrapArray = function ( array ) {
			delete array._ractive;
			array.__proto__ = Array.prototype;
		};
	}

	else {
		// no, we can't
		wrapArray = function ( array ) {
			var i, methodName;

			i = mutatorMethods.length;
			while ( i-- ) {
				methodName = mutatorMethods[i];
				defineProperty( array, methodName, {
					value: WrappedArrayProto[ methodName ],
					configurable: true
				});
			}
		};

		unwrapArray = function ( array ) {
			var i;

			i = mutatorMethods.length;
			while ( i-- ) {
				delete array[ mutatorMethods[i] ];
			}

			delete array._ractive;
		};
	}

}());
(function () {

	var propertyNames, determineNameAndNamespace, setStaticAttribute, determinePropertyName, isAttributeSelfUpdating, isAttributeBindable;

	// the property name equivalents for element attributes, where they differ
	// from the lowercased attribute name
	propertyNames = {
		'accept-charset': 'acceptCharset',
		accesskey: 'accessKey',
		bgcolor: 'bgColor',
		'class': 'className',
		codebase: 'codeBase',
		colspan: 'colSpan',
		contenteditable: 'contentEditable',
		datetime: 'dateTime',
		dirname: 'dirName',
		'for': 'htmlFor',
		'http-equiv': 'httpEquiv',
		ismap: 'isMap',
		maxlength: 'maxLength',
		novalidate: 'noValidate',
		pubdate: 'pubDate',
		readonly: 'readOnly',
		rowspan: 'rowSpan',
		tabindex: 'tabIndex',
		usemap: 'useMap'
	};

	// Attribute
	DomAttribute = function ( options ) {

		determineNameAndNamespace( this, options.name );

		// if it's an empty attribute, or just a straight key-value pair, with no
		// mustache shenanigans, set the attribute accordingly and go home
		if ( options.value === null || typeof options.value === 'string' ) {
			setStaticAttribute( this, options );
			return;
		}

		// otherwise we need to do some work
		this.root = options.root;
		this.element = options.element;
		this.parentNode = options.parentNode;
		this.lcName = this.name.toLowerCase();

		// share parentFragment with parent element
		this.parentFragment = this.element.parentFragment;

		this.fragment = new StringFragment({
			descriptor:   options.value,
			root:         this.root,
			owner:        this,
			contextStack: options.contextStack
		});


		// if we're not rendering (i.e. we're just stringifying), we can stop here
		if ( !this.parentNode ) {
			return;
		}


		// can we establish this attribute's property name equivalent?
		determinePropertyName( this, options );
		
		// determine whether this attribute can be marked as self-updating
		this.selfUpdating = isAttributeSelfUpdating( this );

		// if two-way binding is enabled, and we've got a dynamic `value` attribute, and this is an input or textarea, set up two-way binding
		this.isBindable = isAttributeBindable( this );

		if ( this.isBindable && this.propertyName === 'name' ) {
			// name attribute is a special case - it is the only two-way attribute that updates
			// the viewmodel based on the value of another attribute. For that reason it must wait
			// until the node has been initialised, and the viewmodel has had its first two-way
			// update, before updating itself (otherwise it may disable a checkbox or radio that
			// was enabled in the template)
			this.isTwowayNameAttr = true;
		}

		// mark as ready
		this.ready = true;
	};

	DomAttribute.prototype = {
		bind: function ( lazy ) {
			var self = this, node = this.parentNode, interpolator, keypath, index, options, option, i, len;

			if ( !this.fragment ) {
				return false; // report failure
			}

			// TODO refactor this? Couldn't the interpolator have got a keypath via an expression?
			// Check this is a suitable candidate for two-way binding - i.e. it is
			// a single interpolator, which isn't an expression
			if (
				this.fragment.items.length !== 1 ||
				this.fragment.items[0].type !== INTERPOLATOR ||
				( !this.fragment.items[0].keypath && !this.fragment.items[0].ref )
			) {
				if ( this.root.debug ) {
					if ( console && console.warn ) {
						console.warn( 'Not a valid two-way data binding candidate - must be a single interpolator:', this.fragment.items );
					}
				}
				return false; // report failure
			}

			this.interpolator = this.fragment.items[0];

			// Hmmm. Not sure if this is the best way to handle this ambiguity...
			//
			// Let's say we were given `value="{{bar}}"`. If the context stack was
			// context stack was `["foo"]`, and `foo.bar` *wasn't* `undefined`, the
			// keypath would be `foo.bar`. Then, any user input would result in
			// `foo.bar` being updated.
			//
			// If, however, `foo.bar` *was* undefined, and so was `bar`, we would be
			// left with an unresolved partial keypath - so we are forced to make an
			// assumption. That assumption is that the input in question should
			// be forced to resolve to `bar`, and any user input would affect `bar`
			// and not `foo.bar`.
			//
			// Did that make any sense? No? Oh. Sorry. Well the moral of the story is
			// be explicit when using two-way data-binding about what keypath you're
			// updating. Using it in lists is probably a recipe for confusion...
			this.keypath = this.interpolator.keypath || this.interpolator.descriptor.r;
			
			
			// select
			if ( node.tagName === 'SELECT' && this.propertyName === 'value' ) {
				// We need to know if one of the options was selected, so we
				// can initialise the viewmodel. To do that we need to jump
				// through a couple of hoops
				options = node.getElementsByTagName( 'option' );

				len = options.length;
				for ( i=0; i<len; i+=1 ) {
					option = options[i];
					if ( option.hasAttribute( 'selected' ) ) { // not option.selected - won't work here
						this.root.set( this.keypath, option.value );
						break;
					}
				}
			}

			// checkboxes and radio buttons
			if ( node.type === 'checkbox' || node.type === 'radio' ) {
				// We might have a situation like this: 
				//
				//     <input type='radio' name='{{colour}}' value='red'>
				//     <input type='radio' name='{{colour}}' value='blue'>
				//     <input type='radio' name='{{colour}}' value='green'>
				//
				// In this case we want to set `colour` to the value of whichever option
				// is checked. (We assume that a value attribute has been supplied.)

				if ( this.propertyName === 'name' ) {
					// replace actual name attribute
					node.name = '{{' + this.keypath + '}}';

					this.updateViewModel = function () {
						if ( node.checked ) {
							self.root.set( self.keypath, node.value );
						}
					};
				}


				// Or, we might have a situation like this:
				//
				//     <input type='checkbox' checked='{{active}}'>
				//
				// Here, we want to set `active` to true or false depending on whether
				// the input is checked.

				else if ( this.propertyName === 'checked' ) {
					this.updateViewModel = function () {
						self.root.set( self.keypath, node.checked );
					};
				}
			}

			else {
				// Otherwise we've probably got a situation like this:
				//
				//     <input value='{{name}}'>
				//
				// in which case we just want to set `name` whenever the user enters text.
				// The same applies to selects and textareas 
				this.updateViewModel = function () {
					var value;

					value = node.value;

					// special cases
					if ( value === '0' ) {
						value = 0;
					}

					else if ( value !== '' ) {
						value = +value || value;
					}

					// Note: we're counting on `this.root.set` recognising that `value` is
					// already what it wants it to be, and short circuiting the process.
					// Rather than triggering an infinite loop...
					self.root.set( self.keypath, value );
				};
			}
			

			// if we figured out how to bind changes to the viewmodel, add the event listeners
			if ( this.updateViewModel ) {
				this.twoway = true;

				this.boundEvents = [ 'change', 'click', 'blur' ]; // TODO click only in IE?

				if ( !lazy ) {
					this.boundEvents[3] = 'input';

					// this is a hack to see if we're in IE - if so, we probably need to add
					// a keyup listener as well, since in IE8 the input event doesn't fire,
					// and in IE9 it doesn't fire when text is deleted
					if ( node.attachEvent ) {
						this.boundEvents[4] = 'keyup';
					}
				}

				i = this.boundEvents.length;
				while ( i-- ) {
					node.addEventListener( this.boundEvents[i], this.updateViewModel );
				}
			}
		},

		updateBindings: function () {
			// if the fragment this attribute belongs to gets reassigned (as a result of
			// as section being updated via an array shift, unshift or splice), this
			// attribute needs to recognise that its keypath has changed
			this.keypath = this.interpolator.keypath || this.interpolator.r;

			// if we encounter the special case described above, update the name attribute
			if ( this.propertyName === 'name' ) {
				// replace actual name attribute
				this.parentNode.name = '{{' + this.keypath + '}}';
			}
		},

		teardown: function () {
			var i;

			if ( this.boundEvents ) {
				i = this.boundEvents.length;

				while ( i-- ) {
					this.parentNode.removeEventListener( this.boundEvents[i], this.updateViewModel );
				}
			}

			// ignore non-dynamic attributes
			if ( this.fragment ) {
				this.fragment.teardown();
			}
		},

		bubble: function () {
			// If an attribute's text fragment contains a single item, we can
			// update the DOM immediately...
			if ( this.selfUpdating ) {
				this.update();
			}

			// otherwise we want to register it as a deferred attribute, to be
			// updated once all the information is in, to prevent unnecessary
			// DOM manipulation
			else if ( !this.deferred && this.ready ) {
				this.root._defAttrs[ this.root._defAttrs.length ] = this;
				this.deferred = true;
			}
		},

		update: function () {
			var value, lowerCaseName;

			if ( !this.ready ) {
				return this; // avoid items bubbling to the surface when we're still initialising
			}

			if ( this.twoway ) {
				// TODO compare against previous?

				lowerCaseName = this.lcName;
				value = this.interpolator.value;

				// special case - if we have an element like this:
				//
				//     <input type='radio' name='{{colour}}' value='red'>
				//
				// and `colour` has been set to 'red', we don't want to change the name attribute
				// to red, we want to indicate that this is the selected option, by setting
				// input.checked = true
				if ( lowerCaseName === 'name' && ( this.parentNode.type === 'checkbox' || this.parentNode.type === 'radio' ) ) {
					if ( value === this.parentNode.value ) {
						this.parentNode.checked = true;
					} else {
						this.parentNode.checked = false;
					}

					return this; 
				}

				// don't programmatically update focused element
				if ( doc.activeElement === this.parentNode ) {
					return this;
				}
			}

			value = this.fragment.getValue();

			if ( value === undefined ) {
				value = '';
			}

			if ( value !== this.value ) {
				if ( this.useProperty ) {
					this.parentNode[ this.propertyName ] = value;
					return this;
				}

				if ( this.namespace ) {
					this.parentNode.setAttributeNS( this.namespace, this.name, value );
					return this;
				}

				if ( this.lcName === 'id' ) {
					if ( this.value !== undefined ) {
						this.root.nodes[ this.value ] = undefined;
					}

					this.root.nodes[ value ] = this.parentNode;
				}

				this.parentNode.setAttribute( this.name, value );

				this.value = value;
			}

			return this;
		},

		toString: function () {
			var str;

			if ( this.value === null ) {
				return this.name;
			}

			// TODO don't use JSON.stringify?

			if ( !this.fragment ) {
				return this.name + '=' + JSON.stringify( this.value );
			}

			// TODO deal with boolean attributes correctly
			str = this.fragment.toString();
			
			return this.name + '=' + JSON.stringify( str );
		}
	};


	// Helper functions
	determineNameAndNamespace = function ( attribute, name ) {
		var colonIndex, namespacePrefix;

		// are we dealing with a namespaced attribute, e.g. xlink:href?
		colonIndex = name.indexOf( ':' );
		if ( colonIndex !== -1 ) {

			// looks like we are, yes...
			namespacePrefix = name.substr( 0, colonIndex );

			// ...unless it's a namespace *declaration*, which we ignore (on the assumption
			// that only valid namespaces will be used)
			if ( namespacePrefix !== 'xmlns' ) {
				name = name.substring( colonIndex + 1 );

				attribute.name = name;
				attribute.namespace = namespaces[ namespacePrefix ];

				if ( !attribute.namespace ) {
					throw 'Unknown namespace ("' + namespacePrefix + '")';
				}

				return;
			}
		}

		attribute.name = name;
	};

	setStaticAttribute = function ( attribute, options ) {
		if ( options.parentNode ) {
			if ( attribute.namespace ) {
				options.parentNode.setAttributeNS( attribute.namespace, options.name, options.value );
			} else {
				options.parentNode.setAttribute( options.name, options.value );
			}

			if ( options.name.toLowerCase() === 'id' ) {
				options.root.nodes[ options.value ] = options.parentNode;
			}
		}

		attribute.value = options.value;
	};

	determinePropertyName = function ( attribute, options ) {
		var lowerCaseName, propertyName;

		if ( attribute.parentNode && !attribute.namespace && ( !options.parentNode.namespaceURI || options.parentNode.namespaceURI === namespaces.html ) ) {
			lowerCaseName = attribute.lcName;
			propertyName = propertyNames[ lowerCaseName ] || lowerCaseName;

			if ( options.parentNode[ propertyName ] !== undefined ) {
				attribute.propertyName = propertyName;
			}

			// is attribute a boolean attribute or 'value'? If so we're better off doing e.g.
			// node.selected = true rather than node.setAttribute( 'selected', '' )
			if ( typeof options.parentNode[ propertyName ] === 'boolean' || propertyName === 'value' ) {
				attribute.useProperty = true;
			}
		}
	};

	isAttributeSelfUpdating = function ( attribute ) {
		var i, item, containsInterpolator;

		i = attribute.fragment.items.length;
		while ( i-- ) {
			item = attribute.fragment.items[i];
			if ( item.type === TEXT ) {
				continue;
			}

			// we can only have one interpolator and still be self-updating
			if ( item.type === INTERPOLATOR ) {
				if ( containsInterpolator ) {
					return false;
				} else {
					containsInterpolator = true;
					continue;
				}
			}

			// anything that isn't text or an interpolator (i.e. a section)
			// and we can't self-update
			return false;
		}

		return true;
	};

	isAttributeBindable = function ( attribute ) {
		var tagName, propertyName;

		if ( !attribute.root.twoway ) {
			return false;
		}

		tagName = attribute.element.descriptor.e.toLowerCase();
		propertyName = attribute.propertyName;

		return (
			( propertyName === 'name' || propertyName === 'value' || propertyName === 'checked' ) &&
			( tagName === 'input' || tagName === 'textarea' || tagName === 'select' )
		);
	};

}());
// Element
DomElement = function ( options, docFrag ) {

	var parentFragment,
		descriptor,
		namespace,
		eventName,
		eventNames,
		i,
		attr,
		attrName,
		lcName,
		attrValue,
		bindable,
		twowayNameAttr,
		parentNode,
		root,
		transition,
		transitionName,
		transitionParams,
		transitionManager,
		intro;

	this.type = ELEMENT;

	// stuff we'll need later
	parentFragment = this.parentFragment = options.parentFragment;
	descriptor = this.descriptor = options.descriptor;

	this.root = root = parentFragment.root;
	this.parentNode = parentFragment.parentNode;
	this.index = options.index;

	this.eventListeners = [];
	this.customEventListeners = [];

	// get namespace, if we're actually rendering (not server-side stringifying)
	if ( this.parentNode ) {
		if ( descriptor.a && descriptor.a.xmlns ) {
			namespace = descriptor.a.xmlns;

			// check it's a string!
			if ( typeof namespace !== 'string' ) {
				throw new Error( 'Namespace attribute cannot contain mustaches' );
			}
		} else {
			namespace = ( descriptor.e.toLowerCase() === 'svg' ? namespaces.svg : this.parentNode.namespaceURI );
		}
		

		// create the DOM node
		this.node = doc.createElementNS( namespace, descriptor.e );
	}


	// append children, if there are any
	if ( descriptor.f ) {
		if ( typeof descriptor.f === 'string' && ( !this.node || ( !this.node.namespaceURI || this.node.namespaceURI === namespaces.html ) ) ) {
			// great! we can use innerHTML
			this.html = descriptor.f;

			if ( docFrag ) {
				this.node.innerHTML = this.html;
			}
		}

		else {
			// once again, everyone has to suffer because of IE bloody 8
			if ( descriptor.e === 'style' && this.node.styleSheet !== undefined ) {
				this.fragment = new StringFragment({
					descriptor:   descriptor.f,
					root:         root,
					contextStack: parentFragment.contextStack,
					owner:        this
				});

				if ( docFrag ) {
					this.bubble = function () {
						this.node.styleSheet.cssText = this.fragment.toString();
					};
				}
			}

			else {
				this.fragment = new DomFragment({
					descriptor:   descriptor.f,
					root:         root,
					parentNode:   this.node,
					contextStack: parentFragment.contextStack,
					owner:        this
				});

				if ( docFrag ) {
					this.node.appendChild( this.fragment.docFrag );
				}
			}
		}
	}


	// create event proxies
	if ( docFrag && descriptor.v ) {
		for ( eventName in descriptor.v ) {
			if ( hasOwn.call( descriptor.v, eventName ) ) {
				eventNames = eventName.split( '-' );
				i = eventNames.length;

				while ( i-- ) {
					this.addEventProxy( eventNames[i], descriptor.v[ eventName ], parentFragment.contextStack );
				}
			}
		}
	}


	// set attributes
	this.attributes = [];
	bindable = []; // save these till the end

	for ( attrName in descriptor.a ) {
		if ( hasOwn.call( descriptor.a, attrName ) ) {
			attrValue = descriptor.a[ attrName ];
			
			attr = new DomAttribute({
				element:      this,
				name:         attrName,
				value:        ( attrValue === undefined ? null : attrValue ),
				root:         root,
				parentNode:   this.node,
				contextStack: parentFragment.contextStack
			});

			this.attributes[ this.attributes.length ] = attr;

			if ( attr.isBindable ) {
				bindable.push( attr );
			}

			if ( attr.isTwowayNameAttr ) {
				twowayNameAttr = attr;
			} else {
				attr.update();
			}
		}
	}

	// if we're actually rendering (i.e. not server-side stringifying), proceed
	if ( docFrag ) {
		while ( bindable.length ) {
			bindable.pop().bind( this.root.lazy );
		}

		if ( twowayNameAttr ) {
			twowayNameAttr.updateViewModel();
			twowayNameAttr.update();
		}

		docFrag.appendChild( this.node );

		// trigger intro transition
		if ( descriptor.t1 ) {
			executeTransition( descriptor.t1, root, this, parentFragment.contextStack, true );
		}
	}
};

DomElement.prototype = {
	addEventProxy: function ( triggerEventName, proxyDescriptor, contextStack ) {
		var self = this, root = this.root, proxyName, proxyArgs, dynamicArgs, reuseable, definition, listener, fragment, handler, comboKey;

		// Note the current context - this can be useful with event handlers
		if ( !this.node._ractive ) {
			defineProperty( this.node, '_ractive', { value: {
				keypath: ( contextStack.length ? contextStack[ contextStack.length - 1 ] : '' ),
				index: this.parentFragment.indexRefs
			} });
		}

		if ( typeof proxyDescriptor === 'string' ) {
			proxyName = proxyDescriptor;
		} else {
			proxyName = proxyDescriptor.n;
		}

		// This key uniquely identifies this trigger+proxy name combo on this element
		comboKey = triggerEventName + '=' + proxyName;
		
		if ( proxyDescriptor.a ) {
			proxyArgs = proxyDescriptor.a;
		}

		else if ( proxyDescriptor.d ) {
			dynamicArgs = true;

			proxyArgs = new StringFragment({
				descriptor:   proxyDescriptor.d,
				root:         this.root,
				owner:        this,
				contextStack: contextStack
			});

			if ( !this.proxyFrags ) {
				this.proxyFrags = [];
			}
			this.proxyFrags[ this.proxyFrags.length ] = proxyArgs;
		}

		if ( proxyArgs !== undefined ) {
			// store arguments on the element, so we can reuse the same handler
			// with multiple elements
			if ( this.node._ractive[ comboKey ] ) {
				throw new Error( 'You cannot have two proxy events with the same trigger event (' + comboKey + ')' );
			}

			this.node._ractive[ comboKey ] = {
				dynamic: dynamicArgs,
				payload: proxyArgs
			};
		}

		// Is this a custom event?
		if ( definition = ( root.eventDefinitions[ triggerEventName ] || Ractive.eventDefinitions[ triggerEventName ] ) ) {
			// If the proxy is a string (e.g. <a proxy-click='select'>{{item}}</a>) then
			// we can reuse the handler. This eliminates the need for event delegation
			if ( !root._customProxies[ comboKey ] ) {
				root._customProxies[ comboKey ] = function ( proxyEvent ) {
					var args, payload;

					if ( !proxyEvent.node ) {
						throw new Error( 'Proxy event definitions must fire events with a `node` property' );
					}

					proxyEvent.keypath = proxyEvent.node._ractive.keypath;
					proxyEvent.context = root.get( proxyEvent.keypath );
					proxyEvent.index = proxyEvent.node._ractive.index;

					if ( proxyEvent.node._ractive[ comboKey ] ) {
						args = proxyEvent.node._ractive[ comboKey ];
						payload = args.dynamic ? args.payload.toJson() : args.payload;
					}

					root.fire( proxyName, proxyEvent, payload );
				};
			}

			handler = root._customProxies[ comboKey ];

			// Use custom event. Apply definition to this node
			listener = definition( this.node, handler );
			this.customEventListeners[ this.customEventListeners.length ] = listener;

			return;
		}

		// If not, we just need to check it is a valid event for this element
		// warn about invalid event handlers, if we're in debug mode
		if ( this.node[ 'on' + triggerEventName ] !== undefined && root.debug ) {
			if ( console && console.warn ) {
				console.warn( 'Invalid event handler (' + triggerEventName + ')' );
			}
		}

		if ( !root._proxies[ comboKey ] ) {
			root._proxies[ comboKey ] = function ( event ) {
				var args, payload, proxyEvent = {
					node: this,
					original: event,
					keypath: this._ractive.keypath,
					context: root.get( this._ractive.keypath ),
					index: this._ractive.index
				};

				if ( this._ractive && this._ractive[ comboKey ] ) {
					args = this._ractive[ comboKey ];
					payload = args.dynamic ? args.payload.toJson() : args.payload;
				}

				root.fire( proxyName, proxyEvent, payload );
			};
		}

		handler = root._proxies[ comboKey ];

		this.eventListeners[ this.eventListeners.length ] = {
			n: triggerEventName,
			h: handler
		};

		this.node.addEventListener( triggerEventName, handler );
	},

	teardown: function ( detach ) {
		var self = this, tearThisDown, transitionManager, transitionName, transitionParams, listener, outro;

		// Children first. that way, any transitions on child elements will be
		// handled by the current transitionManager
		if ( self.fragment ) {
			self.fragment.teardown( false );
		}

		while ( self.attributes.length ) {
			self.attributes.pop().teardown();
		}

		while ( self.eventListeners.length ) {
			listener = self.eventListeners.pop();
			self.node.removeEventListener( listener.n, listener.h );
		}

		while ( self.customEventListeners.length ) {
			self.customEventListeners.pop().teardown();
		}

		if ( this.proxyFrags ) {
			while ( this.proxyFrags.length ) {
				this.proxyFrags.pop().teardown();
			}
		}

		if ( this.descriptor.t2 ) {
			executeTransition( this.descriptor.t2, this.root, this, this.parentFragment.contextStack, false );
		}

		if ( detach ) {
			this.root._transitionManager.detachWhenReady( this.node );
		}
	},

	firstNode: function () {
		return this.node;
	},

	findNextNode: function ( fragment ) {
		return null;
	},

	bubble: function () {
		// noop - just so event proxy and transition fragments have something to call!
	},

	toString: function () {
		var str, i, len, attr;

		// TODO void tags
		str = '' +
			'<' + this.descriptor.e;

		len = this.attributes.length;
		for ( i=0; i<len; i+=1 ) {
			str += ' ' + this.attributes[i].toString();
		}

		str += '>';

		if ( this.html ) {
			str += this.html;
		} else if ( this.fragment ) {
			str += this.fragment.toString();
		}

		str += '</' + this.descriptor.e + '>';

		return str;
	}
};
DomFragment = function ( options ) {
	if ( options.parentNode ) {
		this.docFrag = doc.createDocumentFragment();
	}

	// if we have an HTML string, our job is easy.
	if ( typeof options.descriptor === 'string' ) {
		this.html = options.descriptor;

		if ( this.docFrag ) {
			this.nodes = insertHtml( options.descriptor, this.docFrag );
		}
		
		return; // prevent the rest of the init sequence
	}

	// otherwise we need to make a proper fragment
	initFragment( this, options );
};

DomFragment.prototype = {
	createItem: function ( options ) {
		if ( typeof options.descriptor === 'string' ) {
			return new DomText( options, this.docFrag );
		}

		switch ( options.descriptor.t ) {
			case INTERPOLATOR: return new DomInterpolator( options, this.docFrag );
			case SECTION: return new DomSection( options, this.docFrag );
			case TRIPLE: return new DomTriple( options, this.docFrag );

			case ELEMENT: return new DomElement( options, this.docFrag );
			case PARTIAL: return new DomPartial( options, this.docFrag );

			default: throw new Error( 'WTF? not sure what happened here...' );
		}
	},

	teardown: function ( detach ) {
		var node;

		// if this was built from HTML, we just need to remove the nodes
		if ( detach && this.nodes ) {
			while ( this.nodes.length ) {
				node = this.nodes.pop();
				node.parentNode.removeChild( node );
			}
			return;
		}

		// otherwise we need to do a proper teardown
		if ( !this.items ) {
			return;
		}

		while ( this.items.length ) {
			this.items.pop().teardown( detach );
		}
	},

	firstNode: function () {
		if ( this.items && this.items[0] ) {
			return this.items[0].firstNode();
		} else if ( this.nodes ) {
			return this.nodes[0] || null;
		}

		return null;
	},

	findNextNode: function ( item ) {
		var index = item.index;

		if ( this.items[ index + 1 ] ) {
			return this.items[ index + 1 ].firstNode();
		}

		// if this is the root fragment, and there are no more items,
		// it means we're at the end
		if ( this.owner === this.root ) {
			return null;
		}

		return this.owner.findNextNode( this );
	},

	toString: function () {
		var html, i, len, item;
		
		if ( this.html ) {
			return this.html;
		}

		html = '';

		if ( !this.items ) {
			return html;
		}

		len = this.items.length;

		for ( i=0; i<len; i+=1 ) {
			item = this.items[i];
			html += item.toString();
		}

		return html;
	}
};
// Interpolator
DomInterpolator = function ( options, docFrag ) {
	this.type = INTERPOLATOR;

	if ( docFrag ) {
		this.node = doc.createTextNode( '' );
		docFrag.appendChild( this.node );
	}

	// extend Mustache
	initMustache( this, options );
};

DomInterpolator.prototype = {
	update: updateMustache,
	resolve: resolveMustache,

	teardown: function ( detach ) {
		teardown( this );
		
		if ( detach ) {
			this.parentNode.removeChild( this.node );
		}
	},

	render: function ( value ) {
		if ( this.node ) {
			this.node.data = ( value === undefined ? '' : value );
		}
	},

	firstNode: function () {
		return this.node;
	},

	toString: function () {
		var value = ( this.value !== undefined ? '' + this.value : '' );
		return value.replace( '<', '&lt;' ).replace( '>', '&gt;' );
	}
};
// Partials
DomPartial = function ( options, docFrag ) {
	var parentFragment = this.parentFragment = options.parentFragment, descriptor;

	this.type = PARTIAL;
	this.name = options.descriptor.r;

	descriptor = getPartialDescriptor( parentFragment.root, options.descriptor.r );

	this.fragment = new DomFragment({
		descriptor:   descriptor,
		root:         parentFragment.root,
		parentNode:   parentFragment.parentNode,
		contextStack: parentFragment.contextStack,
		owner:        this
	});

	if ( docFrag ) {
		docFrag.appendChild( this.fragment.docFrag );
	}
};

DomPartial.prototype = {
	findNextNode: function () {
		return this.parentFragment.findNextNode( this );
	},

	teardown: function ( detach ) {
		this.fragment.teardown( detach );
	},

	toString: function () {
		return this.fragment.toString();
	}
};
// Section
DomSection = function ( options, docFrag ) {
	this.type = SECTION;

	this.fragments = [];
	this.length = 0; // number of times this section is rendered

	if ( docFrag ) {
		this.docFrag = doc.createDocumentFragment();
	}
	
	this.initialising = true;
	initMustache( this, options );

	if ( docFrag ) {
		docFrag.appendChild( this.docFrag );
	}

	this.initialising = false;
};

DomSection.prototype = {
	update: updateMustache,
	resolve: resolveMustache,

	smartUpdate: function ( methodName, args ) {
		var fragmentOptions, i;

		if ( methodName === 'push' || methodName === 'unshift' || methodName === 'splice' ) {
			fragmentOptions = {
				descriptor: this.descriptor.f,
				root:       this.root,
				parentNode: this.parentNode,
				owner:      this
			};

			if ( this.descriptor.i ) {
				fragmentOptions.indexRef = this.descriptor.i;
			}
		}

		if ( this[ methodName ] ) { // if not, it's sort or reverse, which doesn't affect us (i.e. our length)
			this[ methodName ]( fragmentOptions, args );
		}
	},

	pop: function () {
		// teardown last fragment
		if ( this.length ) {
			this.fragments.pop().teardown( true );
			this.length -= 1;
		}
	},

	push: function ( fragmentOptions, args ) {
		var start, end, i;

		// append list item to context stack
		start = this.length;
		end = start + args.length;

		for ( i=start; i<end; i+=1 ) {
			fragmentOptions.contextStack = this.contextStack.concat( this.keypath + '.' + i );
			fragmentOptions.index = i;

			this.fragments[i] = this.createFragment( fragmentOptions );
		}
		
		this.length += args.length;

		// append docfrag in front of next node
		this.parentNode.insertBefore( this.docFrag, this.parentFragment.findNextNode( this ) );
	},

	shift: function () {
		this.splice( null, [ 0, 1 ] );
	},

	unshift: function ( fragmentOptions, args ) {
		this.splice( fragmentOptions, [ 0, 0 ].concat( new Array( args.length ) ) );
	},

	splice: function ( fragmentOptions, args ) {
		var insertionPoint, addedItems, removedItems, balance, i, start, end, spliceArgs, reassignStart, reassignEnd, reassignBy;

		if ( !args.length ) {
			return;
		}

		// figure out where the changes started...
		start = +( args[0] < 0 ? this.length + args[0] : args[0] );

		// ...and how many items were added to or removed from the array
		addedItems = Math.max( 0, args.length - 2 );
		removedItems = ( args[1] !== undefined ? args[1] : this.length - start );

		balance = addedItems - removedItems;

		if ( !balance ) {
			// The array length hasn't changed - we don't need to add or remove anything
			return;
		}

		// If more items were removed than added, we need to remove some things from the DOM
		if ( balance < 0 ) {
			end = start - balance;

			for ( i=start; i<end; i+=1 ) {
				this.fragments[i].teardown( true );
			}

			// Keep in sync
			this.fragments.splice( start, -balance );
		}

		// Otherwise we need to add some things to the DOM
		else {
			end = start + balance;

			// Figure out where these new nodes need to be inserted
			insertionPoint = ( this.fragments[ start ] ? this.fragments[ start ].firstNode() : this.parentFragment.findNextNode( this ) );

			// Make room for the new fragments. (Just trust me, this works...)
			spliceArgs = [ start, 0 ].concat( new Array( balance ) );
			this.fragments.splice.apply( this.fragments, spliceArgs );

			for ( i=start; i<end; i+=1 ) {
				fragmentOptions.contextStack = this.contextStack.concat( this.keypath + '.' + i );
				fragmentOptions.index = i;

				this.fragments[i] = this.createFragment( fragmentOptions );
			}

			// Append docfrag in front of insertion point
			this.parentNode.insertBefore( this.docFrag, insertionPoint );
		}

		this.length += balance;


		// Now we need to reassign existing fragments (e.g. items.4 -> items.3 - the keypaths,
		// context stacks and index refs will have changed)
		reassignStart = ( start + addedItems );

		reassignFragments( this.root, this, reassignStart, this.length, balance );
	},

	teardown: function ( detach ) {
		this.teardownFragments( detach );

		teardown( this );
	},

	firstNode: function () {
		if ( this.fragments[0] ) {
			return this.fragments[0].firstNode();
		}

		return this.parentFragment.findNextNode( this );
	},

	findNextNode: function ( fragment ) {
		if ( this.fragments[ fragment.index + 1 ] ) {
			return this.fragments[ fragment.index + 1 ].firstNode();
		}

		return this.parentFragment.findNextNode( this );
	},

	teardownFragments: function ( detach ) {
		while ( this.fragments.length ) {
			this.fragments.shift().teardown( detach );
		}
	},

	render: function ( value ) {
		
		updateSection( this, value );

		if ( !this.initialising ) {
			// we need to insert the contents of our document fragment into the correct place
			this.parentNode.insertBefore( this.docFrag, this.parentFragment.findNextNode( this ) );
		}
	},

	createFragment: function ( options ) {
		var fragment = new DomFragment( options );
		
		if ( this.docFrag ) {
			this.docFrag.appendChild( fragment.docFrag );
		}

		return fragment;
	},

	toString: function () {
		var str, i, len;

		str = '';

		i = 0;
		len = this.length;

		for ( i=0; i<len; i+=1 ) {
			str += this.fragments[i].toString();
		}

		return str;
	}
};
// Plain text
DomText = function ( options, docFrag ) {
	this.type = TEXT;
	this.descriptor = options.descriptor;

	if ( docFrag ) {
		this.node = doc.createTextNode( options.descriptor );
		this.parentNode = options.parentFragment.parentNode;

		docFrag.appendChild( this.node );
	}
};

DomText.prototype = {
	teardown: function ( detach ) {
		if ( detach ) {
			this.parentNode.removeChild( this.node );
		}
	},

	firstNode: function () {
		return this.node;
	},

	toString: function () {
		return ( '' + this.descriptor ).replace( '<', '&lt;' ).replace( '>', '&gt;' );
	}
};
// Triple
DomTriple = function ( options, docFrag ) {
	this.type = TRIPLE;

	if ( docFrag ) {
		this.nodes = [];
		this.docFrag = doc.createDocumentFragment();
	}

	this.initialising = true;
	initMustache( this, options );
	if ( docFrag ) {
		docFrag.appendChild( this.docFrag );
	}
	this.initialising = false;
};

DomTriple.prototype = {
	update: updateMustache,
	resolve: resolveMustache,

	teardown: function ( detach ) {

		// remove child nodes from DOM
		if ( detach ) {
			while ( this.nodes.length ) {
				this.parentNode.removeChild( this.nodes.pop() );
			}
		}

		teardown( this );
	},

	firstNode: function () {
		if ( this.nodes[0] ) {
			return this.nodes[0];
		}

		return this.parentFragment.findNextNode( this );
	},

	render: function ( html ) {
		// remove existing nodes
		while ( this.nodes.length ) {
			this.parentNode.removeChild( this.nodes.pop() );
		}

		if ( html === undefined ) {
			this.nodes = [];
			return;
		}

		// get new nodes
		this.nodes = insertHtml( html, this.docFrag );

		if ( !this.initialising ) {
			this.parentNode.insertBefore( this.docFrag, this.parentFragment.findNextNode( this ) );
		}
	},

	toString: function () {
		return ( this.value !== undefined ? this.value : '' );
	}
};
StringFragment = function ( options ) {
	initFragment( this, options );
};

StringFragment.prototype = {
	createItem: function ( options ) {
		if ( typeof options.descriptor === 'string' ) {
			return new StringText( options.descriptor );
		}

		switch ( options.descriptor.t ) {
			case INTERPOLATOR: return new StringInterpolator( options );
			case TRIPLE: return new StringInterpolator( options );
			case SECTION: return new StringSection( options );

			default: throw 'Something went wrong in a rather interesting way';
		}
	},


	bubble: function () {
		this.owner.bubble();
	},

	teardown: function () {
		var numItems, i;

		numItems = this.items.length;
		for ( i=0; i<numItems; i+=1 ) {
			this.items[i].teardown();
		}
	},

	getValue: function () {
		var value;
		
		// Accommodate boolean attributes
		if ( this.items.length === 1 && this.items[0].type === INTERPOLATOR ) {
			value = this.items[0].value;
			if ( value !== undefined ) {
				return value;
			}
		}
		
		return this.toString();
	},

	toString: function () {
		return this.items.join( '' );
	},

	toJson: function () {
		var str, json;

		str = this.toString();

		try {
			json = JSON.parse( str );
		} catch ( err ) {
			json = str;
		}

		return json;
	}
};
// Interpolator or Triple
StringInterpolator = function ( options ) {
	this.type = INTERPOLATOR;
	initMustache( this, options );
};

StringInterpolator.prototype = {
	update: updateMustache,
	resolve: resolveMustache,

	render: function ( value ) {
		this.value = value;
		this.parentFragment.bubble();
	},

	teardown: function () {
		teardown( this );
	},

	toString: function () {
		return ( this.value === undefined ? '' : this.value );
	}
};
// Section
StringSection = function ( options ) {
	this.type = SECTION;
	this.fragments = [];
	this.length = 0;

	initMustache( this, options );
};

StringSection.prototype = {
	update: updateMustache,
	resolve: resolveMustache,

	teardown: function () {
		this.teardownFragments();

		teardown( this );
	},

	teardownFragments: function () {
		while ( this.fragments.length ) {
			this.fragments.shift().teardown();
		}
		this.length = 0;
	},

	bubble: function () {
		this.value = this.fragments.join( '' );
		this.parentFragment.bubble();
	},

	render: function ( value ) {
		updateSection( this, value );
		this.parentFragment.bubble();
	},

	createFragment: function ( options ) {
		return new StringFragment( options );
	},

	toString: function () {
		return this.fragments.join( '' );
	}
};
// Plain text
StringText = function ( text ) {
	this.type = TEXT;
	this.text = text;
};

StringText.prototype = {
	toString: function () {
		return this.text;
	},

	teardown: function () {} // no-op
};
getEl = function ( input ) {
	var output;

	if ( typeof window === 'undefined' || !doc || !input ) {
		return null;
	}

	// We already have a DOM node - no work to do. (Duck typing alert!)
	if ( input.nodeType ) {
		return input;
	}

	// Get node from string
	if ( typeof input === 'string' ) {
		// try ID first
		output = doc.getElementById( input );

		// then as selector, if possible
		if ( !output && doc.querySelector ) {
			output = doc.querySelector( input );
		}

		// did it work?
		if ( output.nodeType ) {
			return output;
		}
	}

	// If we've been given a collection (jQuery, Zepto etc), extract the first item
	if ( input[0] && input[0].nodeType ) {
		return input[0];
	}

	return null;
};
toString = Object.prototype.toString;

// thanks, http://perfectionkills.com/instanceof-considered-harmful-or-how-to-write-a-robust-isarray/
isArray = function ( obj ) {
	return toString.call( obj ) === '[object Array]';
};

isEqual = function ( a, b ) {
	if ( a === null && b === null ) {
		return true;
	}

	if ( typeof a === 'object' || typeof b === 'object' ) {
		return false;
	}

	return a === b;
};

// http://stackoverflow.com/questions/18082/validate-numbers-in-javascript-isnumeric
isNumeric = function ( n ) {
	return !isNaN( parseFloat( n ) ) && isFinite( n );
};

isObject = function ( obj ) {
	return ( typeof obj === 'object' && toString.call( obj ) === '[object Object]' );
};
// We're not using a constructor here because it's convenient (and more
// efficient) to pass e.g. transitionManager.pop as a callback, rather
// than wrapping a prototype method in an anonymous function each time
makeTransitionManager = function ( root, callback ) {
	var transitionManager, nodesToDetach, detachNodes, nodeHasNoTransitioningChildren;

	nodesToDetach = [];

	// detach any nodes which a) need to be detached and b) have no child nodes
	// which are actively transitioning. This will be called each time a
	// transition completes
	detachNodes = function () {
		var i, node;

		i = nodesToDetach.length;
		while ( i-- ) {
			node = nodesToDetach[i];

			// see if this node can be detached yet
			if ( nodeHasNoTransitioningChildren( node ) ) {
				node.parentNode.removeChild( node );
				nodesToDetach.splice( i, 1 );
			}
		}
	};

	nodeHasNoTransitioningChildren = function ( node ) {
		var i, candidate;

		i = transitionManager.active.length;
		while ( i-- ) {
			candidate = transitionManager.active[i];

			if ( node.contains( candidate ) ) {
				// fail as soon as possible
				return false;
			}
		}

		return true;
	};

	transitionManager = {
		active: [],
		info: { i: 0 },
		push: function ( node ) {
			transitionManager.active[ transitionManager.active.length ] = node;
			transitionManager.info.i += 1;
		},
		pop: function ( node ) {
			transitionManager.active.splice( transitionManager.active.indexOf( node ), 1 );
			
			detachNodes();

			if ( !transitionManager.active.length && transitionManager._ready ) {
				transitionManager.complete();
			}
		},
		complete: function () {
			if ( callback ) {
				callback.call( root );
			}
		},
		ready: function () {
			detachNodes();

			transitionManager._ready = true;
			if ( !transitionManager.active.length ) {
				transitionManager.complete();
			}
		},
		detachWhenReady: function ( node ) {
			nodesToDetach[ nodesToDetach.length ] = node;
		}
	};

	return transitionManager;
};
splitKeypath =  function ( keypath ) {
	var index, startIndex, keys, remaining, part;

	// We should only have to do all the heavy regex stuff once... caching FTW
	if ( keypathCache[ keypath ] ) {
		return keypathCache[ keypath ].concat();
	}

	keys = [];
	remaining = keypath;
	
	startIndex = 0;

	// Split into keys
	while ( remaining.length ) {
		// Find next dot
		index = remaining.indexOf( '.', startIndex );

		// Final part?
		if ( index === -1 ) {
			part = remaining;
			remaining = '';
		}

		else {
			// If this dot is preceded by a backslash, which isn't
			// itself preceded by a backslash, we consider it escaped
			if ( remaining.charAt( index - 1) === '\\' && remaining.charAt( index - 2 ) !== '\\' ) {
				// we don't want to keep this part, we want to keep looking
				// for the separator
				startIndex = index + 1;
				continue;
			}

			// Otherwise, we have our next part
			part = remaining.substr( 0, index );
			startIndex = 0;
		}

		if ( /\[/.test( part ) ) {
			keys = keys.concat( part.replace( /\[\s*([0-9]+)\s*\]/g, '.$1' ).split( '.' ) );
		} else {
			keys[ keys.length ] = part;
		}
		
		remaining = remaining.substring( index + 1 );
	}

	
	keypathCache[ keypath ] = keys;
	return keys.concat();
};
(function () {

	var getItem,
	getText,
	getMustache,
	getElement,

	Fragment,
	Text,
	Mustache,
	Section,
	Element,
	Expression,

	stringify,
	jsonify;


	getFragmentStubFromTokens = function ( tokens, options, preserveWhitespace ) {
		var parser, stub;

		parser = {
			pos: 0,
			tokens: tokens || [],
			next: function () {
				return parser.tokens[ parser.pos ];
			},
			options: options
		};

		stub = new Fragment( parser, preserveWhitespace );

		return stub;
	};

	getItem = function ( parser, preserveWhitespace ) {
		if ( !parser.next() ) {
			return null;
		}

		return getText( parser, preserveWhitespace )
		    || getMustache( parser, preserveWhitespace )
		    || getElement( parser, preserveWhitespace );
	};

	getText = function ( parser, preserveWhitespace ) {
		var next = parser.next();

		if ( next.type === TEXT ) {
			parser.pos += 1;
			return new Text( next, preserveWhitespace );
		}

		return null;
	};

	getMustache = function ( parser, preserveWhitespace ) {
		var next = parser.next();

		if ( next.type === MUSTACHE || next.type === TRIPLE ) {
			if ( next.mustacheType === SECTION || next.mustacheType === INVERTED ) {
				return new Section( next, parser, preserveWhitespace );				
			}

			return new Mustache( next, parser );
		}

		return null;
	};

	getElement = function ( parser, preserveWhitespace ) {
		var next = parser.next(), stub;

		if ( next.type === TAG ) {
			stub = new Element( next, parser, preserveWhitespace );

			// sanitize			
			if ( parser.options.sanitize && parser.options.sanitize.elements ) {
				if ( parser.options.sanitize.elements.indexOf( stub.lcTag ) !== -1 ) {
					return null;
				}
			}

			return stub;
		}

		return null;
	};

	stringify = function ( items ) {
		var str = '', itemStr, i, len;

		if ( !items ) {
			return '';
		}

		for ( i=0, len=items.length; i<len; i+=1 ) {
			itemStr = items[i].toString();
			
			if ( itemStr === false ) {
				return false;
			}

			str += itemStr;
		}

		return str;
	};

	jsonify = function ( items, noStringify ) {
		var str, json;

		if ( !noStringify ) {
			str = stringify( items );
			if ( str !== false ) {
				return str;
			}
		}

		json = items.map( function ( item ) {
			return item.toJson( noStringify );
		});

		return json;
	};



	Fragment = function ( parser, preserveWhitespace ) {
		var items, item;

		items = this.items = [];

		item = getItem( parser, preserveWhitespace );
		while ( item !== null ) {
			items[ items.length ] = item;
			item = getItem( parser, preserveWhitespace );
		}
	};

	Fragment.prototype = {
		toJson: function ( noStringify ) {
			var json = jsonify( this.items, noStringify );
			return json;
		},

		toString: function () {
			var str = stringify( this.items );
			return str;
		}
	};


	// text
	(function () {
		var htmlEntities, decodeCharacterReferences, whitespace;

		Text = function ( token, preserveWhitespace ) {
			this.type = TEXT;
			this.text = ( preserveWhitespace ? token.value : token.value.replace( whitespace, ' ' ) );
		};

		Text.prototype = {
			toJson: function () {
				// this will be used as text, so we need to decode things like &amp;
				return this.decoded || ( this.decoded = decodeCharacterReferences( this.text) );
			},

			toString: function () {
				// this will be used as straight text
				return this.text;
			}
		};

		htmlEntities = { quot: 34, amp: 38, apos: 39, lt: 60, gt: 62, nbsp: 160, iexcl: 161, cent: 162, pound: 163, curren: 164, yen: 165, brvbar: 166, sect: 167, uml: 168, copy: 169, ordf: 170, laquo: 171, not: 172, shy: 173, reg: 174, macr: 175, deg: 176, plusmn: 177, sup2: 178, sup3: 179, acute: 180, micro: 181, para: 182, middot: 183, cedil: 184, sup1: 185, ordm: 186, raquo: 187, frac14: 188, frac12: 189, frac34: 190, iquest: 191, Agrave: 192, Aacute: 193, Acirc: 194, Atilde: 195, Auml: 196, Aring: 197, AElig: 198, Ccedil: 199, Egrave: 200, Eacute: 201, Ecirc: 202, Euml: 203, Igrave: 204, Iacute: 205, Icirc: 206, Iuml: 207, ETH: 208, Ntilde: 209, Ograve: 210, Oacute: 211, Ocirc: 212, Otilde: 213, Ouml: 214, times: 215, Oslash: 216, Ugrave: 217, Uacute: 218, Ucirc: 219, Uuml: 220, Yacute: 221, THORN: 222, szlig: 223, agrave: 224, aacute: 225, acirc: 226, atilde: 227, auml: 228, aring: 229, aelig: 230, ccedil: 231, egrave: 232, eacute: 233, ecirc: 234, euml: 235, igrave: 236, iacute: 237, icirc: 238, iuml: 239, eth: 240, ntilde: 241, ograve: 242, oacute: 243, ocirc: 244, otilde: 245, ouml: 246, divide: 247, oslash: 248, ugrave: 249, uacute: 250, ucirc: 251, uuml: 252, yacute: 253, thorn: 254, yuml: 255, OElig: 338, oelig: 339, Scaron: 352, scaron: 353, Yuml: 376, fnof: 402, circ: 710, tilde: 732, Alpha: 913, Beta: 914, Gamma: 915, Delta: 916, Epsilon: 917, Zeta: 918, Eta: 919, Theta: 920, Iota: 921, Kappa: 922, Lambda: 923, Mu: 924, Nu: 925, Xi: 926, Omicron: 927, Pi: 928, Rho: 929, Sigma: 931, Tau: 932, Upsilon: 933, Phi: 934, Chi: 935, Psi: 936, Omega: 937, alpha: 945, beta: 946, gamma: 947, delta: 948, epsilon: 949, zeta: 950, eta: 951, theta: 952, iota: 953, kappa: 954, lambda: 955, mu: 956, nu: 957, xi: 958, omicron: 959, pi: 960, rho: 961, sigmaf: 962, sigma: 963, tau: 964, upsilon: 965, phi: 966, chi: 967, psi: 968, omega: 969, thetasym: 977, upsih: 978, piv: 982, ensp: 8194, emsp: 8195, thinsp: 8201, zwnj: 8204, zwj: 8205, lrm: 8206, rlm: 8207, ndash: 8211, mdash: 8212, lsquo: 8216, rsquo: 8217, sbquo: 8218, ldquo: 8220, rdquo: 8221, bdquo: 8222, dagger: 8224, Dagger: 8225, bull: 8226, hellip: 8230, permil: 8240, prime: 8242, Prime: 8243, lsaquo: 8249, rsaquo: 8250, oline: 8254, frasl: 8260, euro: 8364, image: 8465, weierp: 8472, real: 8476, trade: 8482, alefsym: 8501, larr: 8592, uarr: 8593, rarr: 8594, darr: 8595, harr: 8596, crarr: 8629, lArr: 8656, uArr: 8657, rArr: 8658, dArr: 8659, hArr: 8660, forall: 8704, part: 8706, exist: 8707, empty: 8709, nabla: 8711, isin: 8712, notin: 8713, ni: 8715, prod: 8719, sum: 8721, minus: 8722, lowast: 8727, radic: 8730, prop: 8733, infin: 8734, ang: 8736, and: 8743, or: 8744, cap: 8745, cup: 8746, 'int': 8747, there4: 8756, sim: 8764, cong: 8773, asymp: 8776, ne: 8800, equiv: 8801, le: 8804, ge: 8805, sub: 8834, sup: 8835, nsub: 8836, sube: 8838, supe: 8839, oplus: 8853, otimes: 8855, perp: 8869, sdot: 8901, lceil: 8968, rceil: 8969, lfloor: 8970, rfloor: 8971, lang: 9001, rang: 9002, loz: 9674, spades: 9824, clubs: 9827, hearts: 9829, diams: 9830	};

		decodeCharacterReferences = function ( html ) {
			var result;

			// named entities
			result = html.replace( /&([a-zA-Z]+);/, function ( match, name ) {
				if ( htmlEntities[ name ] ) {
					return String.fromCharCode( htmlEntities[ name ] );
				}

				return match;
			});

			// hex references
			result = result.replace( /&#x([0-9]+);/, function ( match, hex ) {
				return String.fromCharCode( parseInt( hex, 16 ) );
			});

			// decimal references
			result = result.replace( /&#([0-9]+);/, function ( match, num ) {
				return String.fromCharCode( num );
			});

			return result;
		};

		whitespace = /\s+/g;
	}());


	// mustache
	(function () {
		Mustache = function ( token, parser ) {
			this.type = ( token.type === TRIPLE ? TRIPLE : token.mustacheType );

			if ( token.ref ) {
				this.ref = token.ref;
			}
			
			if ( token.expression ) {
				this.expr = new Expression( token.expression );
			}

			parser.pos += 1;
		};

		Mustache.prototype = {
			toJson: function () {
				var json;

				if ( this.json ) {
					return this.json;
				}

				json = {
					t: this.type
				};

				if ( this.ref ) {
					json.r = this.ref;
				}

				if ( this.expr ) {
					json.x = this.expr.toJson();
				}

				this.json = json;
				return json;
			},

			toString: function () {
				// mustaches cannot be stringified
				return false;
			}
		};


		Section = function ( firstToken, parser, preserveWhitespace ) {
			var next;

			this.ref = firstToken.ref;
			this.indexRef = firstToken.indexRef;

			this.inverted = ( firstToken.mustacheType === INVERTED );

			if ( firstToken.expression ) {
				this.expr = new Expression( firstToken.expression );
			}

			parser.pos += 1;

			this.items = [];
			next = parser.next();

			while ( next ) {
				if ( next.mustacheType === CLOSING ) {
					if ( ( next.ref === this.ref ) || ( next.expr && this.expr ) ) {
						parser.pos += 1;
						break;
					}

					else {
						throw new Error( 'Could not parse template: Illegal closing section' );
					}
				}

				this.items[ this.items.length ] = getItem( parser, preserveWhitespace );
				next = parser.next();
			}
		};

		Section.prototype = {
			toJson: function ( noStringify ) {
				var json, str, i, len, itemStr;

				if ( this.json ) {
					return this.json;
				}

				json = { t: SECTION };

				if ( this.ref ) {
					json.r = this.ref;
				}

				if ( this.indexRef ) {
					json.i = this.indexRef;
				}

				if ( this.inverted ) {
					json.n = true;
				}

				if ( this.expr ) {
					json.x = this.expr.toJson();
				}

				if ( this.items.length ) {
					json.f = jsonify( this.items, noStringify );
				}

				this.json = json;
				return json;
			},

			toString: function () {
				// sections cannot be stringified
				return false;
			}
		};
	}());


	// element
	(function () {
		var voidElementNames, allElementNames, mapToLowerCase, svgCamelCaseElements, svgCamelCaseElementsMap, svgCamelCaseAttributes, svgCamelCaseAttributesMap, closedByParentClose, siblingsByTagName, sanitize, onlyAttrs, onlyProxies, filterAttrs, proxyPattern;

		Element = function ( firstToken, parser, preserveWhitespace ) {
			var closed, next, i, len, attrs, filtered, proxies, attr, getFrag, processProxy, item;

			this.lcTag = firstToken.name.toLowerCase();

			// enforce lower case tag names by default. HTML doesn't care. SVG does, so if we see an SVG tag
			// that should be camelcased, camelcase it
			this.tag = ( svgCamelCaseElementsMap[ this.lcTag ] ? svgCamelCaseElementsMap[ this.lcTag ] : this.lcTag );

			parser.pos += 1;

			// if this is a <pre> element, preserve whitespace within
			preserveWhitespace = ( preserveWhitespace || this.lcTag === 'pre' );

			if ( firstToken.attrs ) {
				filtered = filterAttrs( firstToken.attrs );
				
				attrs = filtered.attrs;
				proxies = filtered.proxies;

				// remove event attributes (e.g. onclick='doSomething()') if we're sanitizing
				if ( parser.options.sanitize && parser.options.sanitize.eventAttributes ) {
					attrs = attrs.filter( sanitize );
				}

				getFrag = function ( attr ) {
					var lcName = attr.name.toLowerCase();

					return {
						name: ( svgCamelCaseAttributesMap[ lcName ] ? svgCamelCaseAttributesMap[ lcName ] : lcName ),
						value: getFragmentStubFromTokens( attr.value )
					};
				};

				processProxy = function ( proxy ) {
					var processed, domEventName, match, tokens, proxyName, proxyArgs, colonIndex, throwError;

					throwError = function () {
						throw new Error( 'Illegal proxy event' );
					};

					if ( !proxy.name || !proxy.value ) {
						throwError();
					}

					processed = { domEventName: proxy.name };

					tokens = proxy.value;

					// proxy event names must start with a string (no mustaches)
					if ( tokens[0].type !== TEXT ) {
						throwError();
					}

					colonIndex = tokens[0].value.indexOf( ':' );
					
					// if no arguments are specified...
					if ( colonIndex === -1 ) {
						
						// ...the proxy name must be string-only (no mustaches)
						if ( tokens.length > 1 ) {
							throwError();
						}

						processed.name = tokens[0].value;
					}

					else {
						processed.name = tokens[0].value.substr( 0, colonIndex );
						tokens[0].value = tokens[0].value.substring( colonIndex + 1 );

						if ( !tokens[0].value ) {
							tokens.shift();
						}

						// can we parse it yet?
						if ( tokens.length === 1 && tokens[0].type === TEXT ) {
							try {
								processed.args = JSON.parse( tokens[0].value );
							} catch ( err ) {
								processed.args = tokens[0].value;
							}
						}

						processed.dynamicArgs = getFragmentStubFromTokens( tokens );
					}

					return processed;
				};

				if ( attrs.length ) {
					this.attributes = attrs.map( getFrag );
				}

				if ( proxies.length ) {
					this.proxies = proxies.map( processProxy );
				}

				// TODO rename this helper function
				if ( filtered.intro ) {
					this.intro = processProxy( filtered.intro );
				}

				if ( filtered.outro ) {
					this.outro = processProxy( filtered.outro );
				}
			}

			if ( firstToken.selfClosing ) {
				this.selfClosing = true;
			}

			if ( voidElementNames.indexOf( this.lcTag ) !== -1 ) {
				this.isVoid = true;
			}

			// if self-closing or a void element, close
			if ( this.selfClosing || this.isVoid ) {
				return;
			}

			this.siblings = siblingsByTagName[ this.lcTag ];

			this.items = [];

			next = parser.next();
			while ( next ) {

				// section closing mustache should also close this element, e.g.
				// <ul>{{#items}}<li>{{content}}{{/items}}</ul>
				if ( next.mustacheType === CLOSING ) {
					break;
				}
				
				if ( next.type === TAG ) {

					// closing tag
					if ( next.closing ) {
						// it's a closing tag, which means this element is closed...
						if ( next.name.toLowerCase() === this.lcTag ) {
							parser.pos += 1;
						}

						break;
					}

					// sibling element, which closes this element implicitly
					else if ( this.siblings && ( this.siblings.indexOf( next.name.toLowerCase() ) !== -1 ) ) {
						break;
					}
					
				}

				this.items[ this.items.length ] = getItem( parser );

				next = parser.next();
			}


			// if we're not preserving whitespace, we can eliminate inner leading and trailing whitespace
			if ( !preserveWhitespace ) {
				item = this.items[0];
				if ( item && item.type === TEXT ) {
					item.text = item.text.replace( leadingWhitespace, '' );
					if ( !item.text ) {
						this.items.shift();
					}
				}

				item = this.items[ this.items.length - 1 ];
				if ( item && item.type === TEXT ) {
					item.text = item.text.replace( trailingWhitespace, '' );
					if ( !item.text ) {
						this.items.pop();
					}
				}
			}
		};

		Element.prototype = {
			toJson: function ( noStringify ) {
				var json, name, value, str, itemStr, proxy, match, i, len;

				json = {
					t: ELEMENT,
					e: this.tag
				};

				if ( this.attributes && this.attributes.length ) {
					json.a = {};

					len = this.attributes.length;
					for ( i=0; i<len; i+=1 ) {
						name = this.attributes[i].name;

						if ( json.a[ name ] ) {
							throw new Error( 'You cannot have multiple elements with the same name' );
						}

						// empty attributes (e.g. autoplay, checked)
						if( this.attributes[i].value === undefined ) {
							value = null;
						}

						value = jsonify( this.attributes[i].value.items, noStringify );

						json.a[ name ] = value;
					}
				}

				if ( this.items && this.items.length ) {
					json.f = jsonify( this.items, noStringify );
				}

				if ( this.proxies && this.proxies.length ) {
					json.v = {};

					len = this.proxies.length;
					for ( i=0; i<len; i+=1 ) {
						proxy = this.proxies[i];

						// TODO rename domEventName, since transitions use the same mechanism
						if ( proxy.args ) {
							json.v[ proxy.domEventName ] = {
								n: proxy.name,
								a: proxy.args
							};
						} else if ( proxy.dynamicArgs ) {
							json.v[ proxy.domEventName ] = {
								n: proxy.name,
								d: jsonify( proxy.dynamicArgs.items, noStringify )
							};
						} else {
							json.v[ proxy.domEventName ] = proxy.name;
						}
					}
				}

				if ( this.intro ) {
					if ( this.intro.args ) {
						json.t1 = {
							n: this.intro.name,
							a: this.intro.args
						};
					} else if ( this.intro.dynamicArgs ) {
						json.t1 = {
							n: this.intro.name,
							d: jsonify( this.intro.dynamicArgs.items, noStringify )
						};
					} else {
						json.t1 = this.intro.name;
					}
				}

				if ( this.outro ) {
					if ( this.outro.args ) {
						json.t2 = {
							n: this.outro.name,
							a: this.outro.args
						};
					} else if ( this.outro.dynamicArgs ) {
						json.t2 = {
							n: this.outro.name,
							d: jsonify( this.outro.dynamicArgs.items, noStringify )
						};
					} else {
						json.t2 = this.outro.name;
					}
				}

				this.json = json;
				return json;
			},

			toString: function () {
				var str, i, len, attrStr, lcName, attrValueStr, fragStr, isVoid;

				if ( this.str !== undefined ) {
					return this.str;
				}

				// if this isn't an HTML element, it can't be stringified (since the only reason to stringify an
				// element is to use with innerHTML, and SVG doesn't support that method.
				// Note: table elements are excluded from this, because IE (of course) fucks up when you use
				// innerHTML with tables
				if ( allElementNames.indexOf( this.tag.toLowerCase() ) === -1 ) {
					return ( this.str = false );
				}

				// see if children can be stringified (i.e. don't contain mustaches)
				fragStr = stringify( this.items );
				if ( fragStr === false ) {
					return ( this.str = false );
				}

				// do we have proxies or transitions? if so we can't use innerHTML
				if ( this.proxies || this.intro || this.outro ) {
					return ( this.str = false );
				}

				// is this a void element?
				isVoid = ( voidElementNames.indexOf( this.tag.toLowerCase() ) !== -1 );

				str = '<' + this.tag;
				
				if ( this.attributes ) {
					for ( i=0, len=this.attributes.length; i<len; i+=1 ) {

						lcName = this.attributes[i].name.toLowerCase();
						
						// does this look like a namespaced attribute? if so we can't stringify it
						if ( lcName.indexOf( ':' ) !== -1 ) {
							return ( this.str = false );
						}

						// if this element has an id attribute, it can't be stringified (since references are stored
						// in ractive.nodes). Similarly, intro and outro transitions
						if ( lcName === 'id' || lcName === 'intro' || lcName === 'outro' ) {
							return ( this.str = false );
						}

						attrStr = ' ' + this.attributes[i].name;

						// empty attributes
						if ( this.attributes[i].value !== undefined ) {
							attrValueStr = this.attributes[i].value.toString();

							if ( attrValueStr === false ) {
								return ( this.str = false );
							}

							if ( attrValueStr !== '' ) {
								attrStr += '=';

								// does it need to be quoted?
								if ( /[\s"'=<>`]/.test( attrValueStr ) ) {
									attrStr += '"' + attrValueStr.replace( /"/g, '&quot;' ) + '"';
								} else {
									attrStr += attrValueStr;
								}
							}
						}

						str += attrStr;
					}
				}

				// if this isn't a void tag, but is self-closing, add a solidus. Aaaaand, we're done
				if ( this.selfClosing && !isVoid ) {
					str += '/>';
					return ( this.str = str );
				}

				str += '>';

				// void element? we're done
				if ( isVoid ) {
					return ( this.str = str );
				}

				// if this has children, add them
				str += fragStr;

				str += '</' + this.tag + '>';
				return ( this.str = str );
			}
		};


		voidElementNames = 'area base br col command embed hr img input keygen link meta param source track wbr'.split( ' ' );
		allElementNames = 'a abbr acronym address applet area b base basefont bdo big blockquote body br button caption center cite code col colgroup dd del dfn dir div dl dt em fieldset font form frame frameset h1 h2 h3 h4 h5 h6 head hr html i iframe img input ins isindex kbd label legend li link map menu meta noframes noscript object ol optgroup option p param pre q s samp script select small span strike strong style sub sup textarea title tt u ul var article aside audio bdi canvas command data datagrid datalist details embed eventsource figcaption figure footer header hgroup keygen mark meter nav output progress ruby rp rt section source summary time track video wbr'.split( ' ' );
		closedByParentClose = 'li dd rt rp optgroup option tbody tfoot tr td th'.split( ' ' );

		svgCamelCaseElements = 'altGlyph altGlyphDef altGlyphItem animateColor animateMotion animateTransform clipPath feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feDistantLight feFlood feFuncA feFuncB feFuncG feFuncR feGaussianBlur feImage feMerge feMergeNode feMorphology feOffset fePointLight feSpecularLighting feSpotLight feTile feTurbulence foreignObject glyphRef linearGradient radialGradient textPath vkern'.split( ' ' );
		svgCamelCaseAttributes = 'attributeName attributeType baseFrequency baseProfile calcMode clipPathUnits contentScriptType contentStyleType diffuseConstant edgeMode externalResourcesRequired filterRes filterUnits glyphRef glyphRef gradientTransform gradientTransform gradientUnits gradientUnits kernelMatrix kernelUnitLength kernelUnitLength kernelUnitLength keyPoints keySplines keyTimes lengthAdjust limitingConeAngle markerHeight markerUnits markerWidth maskContentUnits maskUnits numOctaves pathLength patternContentUnits patternTransform patternUnits pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits refX refY repeatCount repeatDur requiredExtensions requiredFeatures specularConstant specularExponent specularExponent spreadMethod spreadMethod startOffset stdDeviation stitchTiles surfaceScale surfaceScale systemLanguage tableValues targetX targetY textLength textLength viewBox viewTarget xChannelSelector yChannelSelector zoomAndPan'.split( ' ' );
		
		mapToLowerCase = function ( items ) {
			var map = {}, i = items.length;
			while ( i-- ) {
				map[ items[i].toLowerCase() ] = items[i];
			}
			return map;
		};

		svgCamelCaseElementsMap = mapToLowerCase( svgCamelCaseElements );
		svgCamelCaseAttributesMap = mapToLowerCase( svgCamelCaseAttributes );

		siblingsByTagName = {
			li: [ 'li' ],
			dt: [ 'dt', 'dd' ],
			dd: [ 'dt', 'dd' ],
			p: 'address article aside blockquote dir div dl fieldset footer form h1 h2 h3 h4 h5 h6 header hgroup hr menu nav ol p pre section table ul'.split( ' ' ),
			rt: [ 'rt', 'rp' ],
			rp: [ 'rp', 'rt' ],
			optgroup: [ 'optgroup' ],
			option: [ 'option', 'optgroup' ],
			thead: [ 'tbody', 'tfoot' ],
			tbody: [ 'tbody', 'tfoot' ],
			tr: [ 'tr' ],
			td: [ 'td', 'th' ],
			th: [ 'td', 'th' ]
		};

		sanitize = function ( attr ) {
			return attr.name.substr( 0, 2 ) !== 'on';
		};

		onlyAttrs = function ( attr ) {
			return attr.name.substr( 0, 6 ) !== 'proxy-';
		};

		onlyProxies = function ( attr ) {
			if ( attr.name.substr( 0, 6 ) === 'proxy-' ) {
				attr.name = attr.name.substring( 6 );
				return true;
			}
			return false;
		};

		filterAttrs = function ( items ) {
			var attrs, proxies, filtered, i, len, item;

			filtered = {};
			attrs = [];
			proxies = [];

			len = items.length;
			for ( i=0; i<len; i+=1 ) {
				item = items[i];

				// Transition?
				if ( item.name === 'intro' ) {
					if ( filtered.intro ) {
						throw new Error( 'An element can only have one intro transition' );
					}

					filtered.intro = item;
				} else if ( item.name === 'outro' ) {
					if ( filtered.outro ) {
						throw new Error( 'An element can only have one outro transition' );
					}

					filtered.outro = item;
				}

				// Proxy?
				else if ( item.name.substr( 0, 6 ) === 'proxy-' ) {
					item.name = item.name.substring( 6 );
					proxies[ proxies.length ] = item;
				}

				// Attribute?
				else {
					attrs[ attrs.length ] = item;
				}
			}

			filtered.attrs = attrs;
			filtered.proxies = proxies;

			return filtered;
		};

		proxyPattern = /^([a-zA-Z_$][a-zA-Z_$0-9]*)(?::(.+))?$/;
	}());


	// expression
	(function () {

		var getRefs, stringify;

		Expression = function ( token ) {
			this.refs = [];

			getRefs( token, this.refs );
			this.str = stringify( token, this.refs );
		};

		Expression.prototype = {
			toJson: function () {
				return {
					r: this.refs,
					s: this.str
				};
			}
		};


		// TODO maybe refactor this?
		getRefs = function ( token, refs ) {
			var i;

			if ( token.t === REFERENCE ) {
				if ( refs.indexOf( token.n ) === -1 ) {
					refs.unshift( token.n );
				}
			}

			if ( token.o ) {
				if ( isObject( token.o ) ) {
					getRefs( token.o, refs );
				} else {
					i = token.o.length;
					while ( i-- ) {
						getRefs( token.o[i], refs );
					}
				}
			}

			if ( token.x ) {
				getRefs( token.x, refs );
			}

			if ( token.r ) {
				getRefs( token.r, refs );
			}
		};


		stringify = function ( token, refs ) {
			var map = function ( item ) {
				return stringify( item, refs );
			};

			switch ( token.t ) {
				case BOOLEAN_LITERAL:
				case GLOBAL:
				case NUMBER_LITERAL:
				return token.v;

				case STRING_LITERAL:
				return "'" + token.v.replace( /'/g, "\\'" ) + "'";

				case ARRAY_LITERAL:
				return '[' + token.m.map( map ).join( ',' ) + ']';

				case PREFIX_OPERATOR:
				return ( token.s === 'typeof' ? 'typeof ' : token.s ) + stringify( token.o, refs );

				case INFIX_OPERATOR:
				return stringify( token.o[0], refs ) + token.s + stringify( token.o[1], refs );

				case INVOCATION:
				return stringify( token.x, refs ) + '(' + ( token.o ? token.o.map( map ).join( ',' ) : '' ) + ')';

				case BRACKETED:
				return '(' + stringify( token.x, refs ) + ')';

				case MEMBER:
				return stringify( token.x, refs ) + stringify( token.r, refs );

				case REFINEMENT:
				return ( token.n ? '.' + token.n : '[' + stringify( token.x, refs ) + ']' );

				case CONDITIONAL:
				return stringify( token.o[0], refs ) + '?' + stringify( token.o[1], refs ) + ':' + stringify( token.o[2], refs );

				case REFERENCE:
				return '❖' + refs.indexOf( token.n );

				default:
				throw new Error( 'Could not stringify expression token. This error is unexpected' );
			}
		};
	}());

}());
(function () {

	var getStringMatch,
	getRegexMatcher,
	allowWhitespace,

	getMustache,
	getTriple,
	getTag,
	getText,
	getExpression,

	getDelimiter,
	getDelimiterChange,
	getName,
	getMustacheRef,
	getRefinement,
	getDotRefinement,
	getArrayRefinement,
	getArrayMember,

	getSingleQuotedString,
	getUnescapedSingleQuotedChars,
	getDoubleQuotedString,
	getUnescapedDoubleQuotedChars,
	getEscapedChars,
	getEscapedChar,

	fail;


	getToken = function ( tokenizer ) {
		var token = getMustache( tokenizer ) ||
		        getTriple( tokenizer ) ||
		        getTag( tokenizer ) ||
		        getText( tokenizer );

		return token;
	};



	// helpers
	fail = function ( tokenizer, expected ) {
		var remaining = tokenizer.remaining().substr( 0, 40 );
		if ( remaining.length === 40 ) {
			remaining += '...';
		}
		throw new Error( 'Tokenizer failed: unexpected string "' + remaining + '" (expected ' + expected + ')' );
	};

	getStringMatch = function ( tokenizer, string ) {
		var substr;

		substr = tokenizer.str.substr( tokenizer.pos, string.length );

		if ( substr === string ) {
			tokenizer.pos += string.length;
			return string;
		}

		return null;
	};

	getRegexMatcher = function ( regex ) {
		return function ( tokenizer ) {
			var match = regex.exec( tokenizer.str.substring( tokenizer.pos ) );

			if ( !match ) {
				return null;
			}

			tokenizer.pos += match[0].length;
			return match[1] || match[0];
		};
	};

	allowWhitespace = function ( tokenizer ) {
		var match = leadingWhitespace.exec( tokenizer.str.substring( tokenizer.pos ) );

		if ( !match ) {
			return null;
		}

		tokenizer.pos += match[0].length;
		return match[0];
	};


	// shared
	getDelimiter = getRegexMatcher( /^[^\s=]+/ );

	getDelimiterChange = function ( tokenizer ) {
		var start, opening, closing;

		if ( !getStringMatch( tokenizer, '=' ) ) {
			return null;
		}

		start = tokenizer.pos;

		// allow whitespace before new opening delimiter
		allowWhitespace( tokenizer );

		opening = getDelimiter( tokenizer );
		if ( !opening ) {
			tokenizer.pos = start;
			return null;
		}

		// allow whitespace (in fact, it's necessary...)
		allowWhitespace( tokenizer );

		closing = getDelimiter( tokenizer );
		if ( !closing ) {
			tokenizer.pos = start;
			return null;
		}

		// allow whitespace before closing '='
		allowWhitespace( tokenizer );

		if ( !getStringMatch( tokenizer, '=' ) ) {
			tokenizer.pos = start;
			return null;
		}

		return [ opening, closing ];
	};

	getName = getRegexMatcher( /^[a-zA-Z_$][a-zA-Z_$0-9]*/ );

	getMustacheRef = function ( tokenizer ) {
		var start, ref, member, dot, name;

		start = tokenizer.pos;

		dot = getStringMatch( tokenizer, '.' ) || '';
		name = getName( tokenizer ) || '';

		if ( dot && !name ) {
			return dot;
		}

		ref = dot + name;
		if ( !ref ) {
			return null;
		}

		member = getRefinement( tokenizer );
		while ( member !== null ) {
			ref += member;
			member = getRefinement( tokenizer );
		}

		return ref;
	};

	getRefinement = function ( tokenizer ) {
		return getDotRefinement( tokenizer ) || getArrayRefinement( tokenizer );
	};

	getDotRefinement = getRegexMatcher( /^\.[a-zA-Z_$0-9]+/ );

	getArrayRefinement = function ( tokenizer ) {
		var num = getArrayMember( tokenizer );

		if ( num ) {
			return '.' + num;
		}

		return null;
	};

	getArrayMember = getRegexMatcher( /^\[(0|[1-9][0-9]*)\]/ );

	getSingleQuotedString = function ( tokenizer ) {
		var start, string, escaped, unescaped, next;

		start = tokenizer.pos;

		string = '';

		escaped = getEscapedChars( tokenizer );
		if ( escaped ) {
			string += escaped;
		}

		unescaped = getUnescapedSingleQuotedChars( tokenizer );
		if ( unescaped ) {
			string += unescaped;
		}
		if ( string ) {
			next = getSingleQuotedString( tokenizer );
			while ( next ) {
				string += next;
				next = getSingleQuotedString( tokenizer );
			}
		}

		return string;
	};

	getUnescapedSingleQuotedChars = getRegexMatcher( /^[^\\']+/ );

	getDoubleQuotedString = function ( tokenizer ) {
		var start, string, escaped, unescaped, next;

		start = tokenizer.pos;

		string = '';

		escaped = getEscapedChars( tokenizer );
		if ( escaped ) {
			string += escaped;
		}

		unescaped = getUnescapedDoubleQuotedChars( tokenizer );
		if ( unescaped ) {
			string += unescaped;
		}

		if ( !string ) {
			return '';
		}

		next = getDoubleQuotedString( tokenizer );
		while ( next !== '' ) {
			string += next;
		}

		return string;
	};

	getUnescapedDoubleQuotedChars = getRegexMatcher( /^[^\\"]+/ );

	getEscapedChars = function ( tokenizer ) {
		var chars = '', character;

		character = getEscapedChar( tokenizer );
		while ( character ) {
			chars += character;
			character = getEscapedChar( tokenizer );
		}

		return chars || null;
	};

	getEscapedChar = function ( tokenizer ) {
		var character;

		if ( !getStringMatch( tokenizer, '\\' ) ) {
			return null;
		}

		character = tokenizer.str.charAt( tokenizer.pos );
		tokenizer.pos += 1;

		return character;
	};

	



	// mustache / triple
	(function () {
		var getMustacheContent,
			getMustacheType,
			getIndexRef,
			mustacheTypes;

		getMustache = function ( tokenizer ) {
			var start = tokenizer.pos, content;

			if ( !getStringMatch( tokenizer, tokenizer.delimiters[0] ) ) {
				return null;
			}

			// delimiter change?
			content = getDelimiterChange( tokenizer );
			if ( content ) {
				// find closing delimiter or abort...
				if ( !getStringMatch( tokenizer, tokenizer.delimiters[1] ) ) {
					tokenizer.pos = start;
					return null;
				}

				// ...then make the switch
				tokenizer.delimiters = content;
				return { type: MUSTACHE, mustacheType: DELIMCHANGE };
			}

			content = getMustacheContent( tokenizer );

			if ( content === null ) {
				tokenizer.pos = start;
				return null;
			}

			// allow whitespace before closing delimiter
			allowWhitespace( tokenizer );

			if ( !getStringMatch( tokenizer, tokenizer.delimiters[1] ) ) {
				fail( tokenizer, '"' + tokenizer.delimiters[1] + '"' );
			}

			return content;
		};

		getTriple = function ( tokenizer ) {
			var start = tokenizer.pos, content;

			if ( !getStringMatch( tokenizer, tokenizer.tripleDelimiters[0] ) ) {
				return null;
			}

			// delimiter change?
			content = getDelimiterChange( tokenizer );
			if ( content ) {
				// find closing delimiter or abort...
				if ( !getStringMatch( tokenizer, tokenizer.delimiters[1] ) ) {
					tokenizer.pos = start;
					return null;
				}

				// ...then make the switch
				tokenizer.tripleDelimiters = content;
				return { type: DELIMCHANGE };
			}

			// allow whitespace between opening delimiter and reference
			allowWhitespace( tokenizer );

			content = getMustacheContent( tokenizer, true );

			if ( content === null ) {
				tokenizer.pos = start;
				return null;
			}

			// allow whitespace between reference and closing delimiter
			allowWhitespace( tokenizer );

			if ( !getStringMatch( tokenizer, tokenizer.tripleDelimiters[1] ) ) {
				tokenizer.pos = start;
				return null;
			}

			return content;
		};

		getMustacheContent = function ( tokenizer, isTriple ) {
			var start, mustache, type, expr, i, remaining, index;

			start = tokenizer.pos;

			mustache = { type: isTriple ? TRIPLE : MUSTACHE };

			// mustache type
			if ( !isTriple ) {
				type = getMustacheType( tokenizer );
				mustache.mustacheType = type || INTERPOLATOR; // default

				// if it's a comment, allow any contents except '}}'
				if ( type === COMMENT ) {
					remaining = tokenizer.remaining();
					index = remaining.indexOf( tokenizer.delimiters[1] );

					if ( index !== -1 ) {
						tokenizer.pos += index;
						return mustache;
					}
				}
			}

			// allow whitespace
			allowWhitespace( tokenizer );

			// is this an expression?
			if ( getStringMatch( tokenizer, '(' ) ) {
				
				// looks like it...
				allowWhitespace( tokenizer );

				expr = getExpression( tokenizer );

				allowWhitespace( tokenizer );

				if ( !getStringMatch( tokenizer, ')' ) ) {
					fail( tokenizer, '")"' );
				}

				mustache.expression = expr;
			}

			else {
				// mustache reference
				mustache.ref = getMustacheRef( tokenizer );
				if ( !mustache.ref ) {
					tokenizer.pos = start;
					return null;
				}
			}

			// optional index reference
			i = getIndexRef( tokenizer );
			if ( i !== null ) {
				mustache.indexRef = i;
			}

			return mustache;
		};

		mustacheTypes = {
			'#': SECTION,
			'^': INVERTED,
			'/': CLOSING,
			'>': PARTIAL,
			'!': COMMENT,
			'&': INTERPOLATOR
		};

		getMustacheType = function ( tokenizer ) {
			var type = mustacheTypes[ tokenizer.str.charAt( tokenizer.pos ) ];

			if ( !type ) {
				return null;
			}

			tokenizer.pos += 1;
			return type;
		};

		getIndexRef = getRegexMatcher( /^\s*:\s*([a-zA-Z_$][a-zA-Z_$0-9]*)/ );
	}());


	// tag
	(function () {
		var getOpeningTag,
		getClosingTag,
		getTagName,
		getAttributes,
		getAttribute,
		getAttributeName,
		getAttributeValue,
		getUnquotedAttributeValue,
		getUnquotedAttributeValueToken,
		getUnquotedAttributeValueText,
		getSingleQuotedAttributeValue,
		getSingleQuotedStringToken,
		getDoubleQuotedAttributeValue,
		getDoubleQuotedStringToken;

		getTag = function ( tokenizer ) {
			return ( getOpeningTag( tokenizer ) || getClosingTag( tokenizer ) );
		};

		getOpeningTag = function ( tokenizer ) {
			var start, tag, attrs;

			start = tokenizer.pos;

			if ( !getStringMatch( tokenizer, '<' ) ) {
				return null;
			}

			tag = {
				type: TAG
			};

			// tag name
			tag.name = getTagName( tokenizer );
			if ( !tag.name ) {
				tokenizer.pos = start;
				return null;
			}

			// attributes
			attrs = getAttributes( tokenizer );
			if ( attrs ) {
				tag.attrs = attrs;
			}

			// self-closing solidus?
			if ( getStringMatch( tokenizer, '/' ) ) {
				tag.selfClosing = true;
			}

			// closing angle bracket
			if ( !getStringMatch( tokenizer, '>' ) ) {
				tokenizer.pos = start;
				return null;
			}

			return tag;
		};

		getClosingTag = function ( tokenizer ) {
			var start, tag;

			start = tokenizer.pos;

			if ( !getStringMatch( tokenizer, '<' ) ) {
				return null;
			}

			tag = { type: TAG, closing: true };

			// closing solidus
			if ( !getStringMatch( tokenizer, '/' ) ) {
				throw new Error( 'Unexpected character ' + tokenizer.remaining().charAt( 0 ) + ' (expected "/")' );
			}

			// tag name
			tag.name = getTagName( tokenizer );
			if ( !tag.name ) {
				throw new Error( 'Unexpected character ' + tokenizer.remaining().charAt( 0 ) + ' (expected tag name)' );
			}

			// closing angle bracket
			if ( !getStringMatch( tokenizer, '>' ) ) {
				throw new Error( 'Unexpected character ' + tokenizer.remaining().charAt( 0 ) + ' (expected ">")' );
			}

			return tag;
		};

		getTagName = getRegexMatcher( /^[a-zA-Z][a-zA-Z0-9]*/ );

		getAttributes = function ( tokenizer ) {
			var start, attrs, attr;

			start = tokenizer.pos;

			allowWhitespace( tokenizer );

			attr = getAttribute( tokenizer );

			if ( !attr ) {
				tokenizer.pos = start;
				return null;
			}

			attrs = [];

			while ( attr !== null ) {
				attrs[ attrs.length ] = attr;

				allowWhitespace( tokenizer );
				attr = getAttribute( tokenizer );
			}

			return attrs;
		};

		getAttribute = function ( tokenizer ) {
			var attr, name, value;

			name = getAttributeName( tokenizer );
			if ( !name ) {
				return null;
			}

			attr = {
				name: name
			};

			value = getAttributeValue( tokenizer );
			if ( value ) {
				attr.value = value;
			}

			return attr;
		};

		getAttributeName = getRegexMatcher( /^[^\s"'>\/=]+/ );

		

		getAttributeValue = function ( tokenizer ) {
			var start, value;

			start = tokenizer.pos;

			allowWhitespace( tokenizer );

			if ( !getStringMatch( tokenizer, '=' ) ) {
				tokenizer.pos = start;
				return null;
			}

			value = getSingleQuotedAttributeValue( tokenizer ) || getDoubleQuotedAttributeValue( tokenizer ) || getUnquotedAttributeValue( tokenizer );

			if ( value === null ) {
				tokenizer.pos = start;
				return null;
			}

			return value;
		};

		getUnquotedAttributeValueText = getRegexMatcher( /^[^\s"'=<>`]+/ );

		getUnquotedAttributeValueToken = function ( tokenizer ) {
			var start, text, index;

			start = tokenizer.pos;

			text = getUnquotedAttributeValueText( tokenizer );

			if ( !text ) {
				return null;
			}

			if ( ( index = text.indexOf( tokenizer.delimiters[0] ) ) !== -1 ) {
				text = text.substr( 0, index );
				tokenizer.pos = start + text.length;
			}

			return {
				type: TEXT,
				value: text
			};
		};

		getUnquotedAttributeValue = function ( tokenizer ) {
			var tokens, token;

			tokens = [];

			token = getMustache( tokenizer ) || getUnquotedAttributeValueToken( tokenizer );
			while ( token !== null ) {
				tokens[ tokens.length ] = token;
				token = getMustache( tokenizer ) || getUnquotedAttributeValueToken( tokenizer );
			}

			if ( !tokens.length ) {
				return null;
			}

			return tokens;
		};


		getSingleQuotedStringToken = function ( tokenizer ) {
			var start, text, index;

			start = tokenizer.pos;

			text = getSingleQuotedString( tokenizer );

			if ( !text ) {
				return null;
			}

			if ( ( index = text.indexOf( tokenizer.delimiters[0] ) ) !== -1 ) {
				text = text.substr( 0, index );
				tokenizer.pos = start + text.length;
			}

			return {
				type: TEXT,
				value: text
			};
		};

		getSingleQuotedAttributeValue = function ( tokenizer ) {
			var start, tokens, token;

			start = tokenizer.pos;

			if ( !getStringMatch( tokenizer, "'" ) ) {
				return null;
			}

			tokens = [];

			token = getMustache( tokenizer ) || getSingleQuotedStringToken( tokenizer );
			while ( token !== null ) {
				tokens[ tokens.length ] = token;
				token = getMustache( tokenizer ) || getSingleQuotedStringToken( tokenizer );
			}

			if ( !getStringMatch( tokenizer, "'" ) ) {
				tokenizer.pos = start;
				return null;
			}

			return tokens;

		};

		getDoubleQuotedStringToken = function ( tokenizer ) {
			var start, text, index;

			start = tokenizer.pos;

			text = getDoubleQuotedString( tokenizer );

			if ( !text ) {
				return null;
			}

			if ( ( index = text.indexOf( tokenizer.delimiters[0] ) ) !== -1 ) {
				text = text.substr( 0, index );
				tokenizer.pos = start + text.length;
			}

			return {
				type: TEXT,
				value: text
			};
		};

		getDoubleQuotedAttributeValue = function ( tokenizer ) {
			var start, tokens, token;

			start = tokenizer.pos;

			if ( !getStringMatch( tokenizer, '"' ) ) {
				return null;
			}

			tokens = [];

			token = getMustache( tokenizer ) || getDoubleQuotedStringToken( tokenizer );
			while ( token !== null ) {
				tokens[ tokens.length ] = token;
				token = getMustache( tokenizer ) || getDoubleQuotedStringToken( tokenizer );
			}

			if ( !getStringMatch( tokenizer, '"' ) ) {
				tokenizer.pos = start;
				return null;
			}

			return tokens;

		};
	}());


	// text
	(function () {
		getText = function ( tokenizer ) {
			var minIndex, text;

			minIndex = tokenizer.str.length;

			// anything goes except opening delimiters or a '<'
			[ tokenizer.delimiters[0], tokenizer.tripleDelimiters[0], '<' ].forEach( function ( substr ) {
				var index = tokenizer.str.indexOf( substr, tokenizer.pos );

				if ( index !== -1 ) {
					minIndex = Math.min( index, minIndex );
				}
			});

			if ( minIndex === tokenizer.pos ) {
				return null;
			}

			text = tokenizer.str.substring( tokenizer.pos, minIndex );
			tokenizer.pos = minIndex;

			return {
				type: TEXT,
				value: text
			};

		};
	}());


	// expression
	(function () {
		var getExpressionList,
		makePrefixSequenceMatcher,
		makeInfixSequenceMatcher,
		getRightToLeftSequenceMatcher,
		getBracketedExpression,
		getPrimary,
		getMember,
		getInvocation,
		getTypeOf,
		getLogicalOr,
		getConditional,
		
		getDigits,
		getExponent,
		getFraction,
		getInteger,
		
		getReference,
		getRefinement,

		getLiteral,
		getArrayLiteral,
		getBooleanLiteral,
		getNumberLiteral,
		getStringLiteral,
		getObjectLiteral,
		getGlobal,

		getKeyValuePairs,
		getKeyValuePair,
		getKey,

		globals;

		getExpression = function ( tokenizer ) {

			var start, expression, fns, fn, i, len;

			start = tokenizer.pos;

			// The conditional operator is the lowest precedence operator (except yield,
			// assignment operators, and commas, none of which are supported), so we
			// start there. If it doesn't match, it 'falls through' to progressively
			// higher precedence operators, until it eventually matches (or fails to
			// match) a 'primary' - a literal or a reference. This way, the abstract syntax
			// tree has everything in its proper place, i.e. 2 + 3 * 4 === 14, not 20.
			expression = getConditional( tokenizer );

			return expression;
		};

		getExpressionList = function ( tokenizer ) {
			var start, expressions, expr, next;

			start = tokenizer.pos;

			allowWhitespace( tokenizer );

			expr = getExpression( tokenizer );

			if ( expr === null ) {
				return null;
			}

			expressions = [ expr ];

			// allow whitespace between expression and ','
			allowWhitespace( tokenizer );

			if ( getStringMatch( tokenizer, ',' ) ) {
				next = getExpressionList( tokenizer );
				if ( next === null ) {
					tokenizer.pos = start;
					return null;
				}

				expressions = expressions.concat( next );
			}

			return expressions;
		};

		getBracketedExpression = function ( tokenizer ) {
			var start, expr;

			start = tokenizer.pos;

			if ( !getStringMatch( tokenizer, '(' ) ) {
				return null;
			}

			allowWhitespace( tokenizer );

			expr = getExpression( tokenizer );
			if ( !expr ) {
				tokenizer.pos = start;
				return null;
			}

			allowWhitespace( tokenizer );

			if ( !getStringMatch( tokenizer, ')' ) ) {
				tokenizer.pos = start;
				return null;
			}

			return {
				t: BRACKETED,
				x: expr
			};
		};

		getPrimary = function ( tokenizer ) {
			return getLiteral( tokenizer )
			    || getReference( tokenizer )
			    || getBracketedExpression( tokenizer );
		};

		getMember = function ( tokenizer ) {
			var start, expression, name, refinement, member;

			expression = getPrimary( tokenizer );
			if ( !expression ) {
				return null;
			}

			refinement = getRefinement( tokenizer );
			if ( !refinement ) {
				return expression;
			}

			while ( refinement !== null ) {
				member = {
					t: MEMBER,
					x: expression,
					r: refinement
				};

				expression = member;
				refinement = getRefinement( tokenizer );
			}

			return member;
		};

		getInvocation = function ( tokenizer ) {
			var start, expression, expressionList, result;

			expression = getMember( tokenizer );
			if ( !expression ) {
				return null;
			}

			start = tokenizer.pos;

			if ( !getStringMatch( tokenizer, '(' ) ) {
				return expression;
			}

			allowWhitespace( tokenizer );
			expressionList = getExpressionList( tokenizer );

			allowWhitespace( tokenizer );

			if ( !getStringMatch( tokenizer, ')' ) ) {
				tokenizer.pos = start;
				return expression;
			}

			result = {
				t: INVOCATION,
				x: expression
			};

			if ( expressionList ) {
				result.o = expressionList;
			}

			return result;
		};

		// right-to-left
		makePrefixSequenceMatcher = function ( symbol, fallthrough ) {
			return function ( tokenizer ) {
				var start, expression;

				if ( !getStringMatch( tokenizer, symbol ) ) {
					return fallthrough( tokenizer );
				}

				start = tokenizer.pos;

				allowWhitespace( tokenizer );

				expression = getExpression( tokenizer );
				if ( !expression ) {
					fail( tokenizer, 'an expression' );
				}

				return {
					s: symbol,
					o: expression,
					t: PREFIX_OPERATOR
				};
			};
		};

		// create all prefix sequence matchers
		(function () {
			var i, len, matcher, prefixOperators, fallthrough;

			prefixOperators = '! ~ + - typeof'.split( ' ' );

			// An invocation operator is higher precedence than logical-not
			fallthrough = getInvocation;
			for ( i=0, len=prefixOperators.length; i<len; i+=1 ) {
				matcher = makePrefixSequenceMatcher( prefixOperators[i], fallthrough );
				fallthrough = matcher;
			}

			// typeof operator is higher precedence than multiplication, so provides the
			// fallthrough for the multiplication sequence matcher we're about to create
			// (we're skipping void and delete)
			getTypeOf = fallthrough;
		}());


		makeInfixSequenceMatcher = function ( symbol, fallthrough ) {
			return function ( tokenizer ) {
				var start, left, right;

				left = fallthrough( tokenizer );
				if ( !left ) {
					return null;
				}

				start = tokenizer.pos;

				allowWhitespace( tokenizer );

				if ( !getStringMatch( tokenizer, symbol ) ) {
					tokenizer.pos = start;
					return left;
				}

				allowWhitespace( tokenizer );

				right = getExpression( tokenizer );
				if ( !right ) {
					tokenizer.pos = start;
					return left;
				}

				return {
					t: INFIX_OPERATOR,
					s: symbol,
					o: [ left, right ]
				};
			};
		};

		// create all infix sequence matchers
		(function () {
			var i, len, matcher, infixOperators, fallthrough;

			// All the infix operators on order of precedence (source: https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Operators/Operator_Precedence)
			// Each sequence matcher will initially fall through to its higher precedence
			// neighbour, and only attempt to match if one of the higher precedence operators
			// (or, ultimately, a literal, reference, or bracketed expression) already matched
			infixOperators = '* / % + - << >> >>> < <= > >= in instanceof == != === !== & ^ | && ||'.split( ' ' );

			// A typeof operator is higher precedence than multiplication
			fallthrough = getTypeOf;
			for ( i=0, len=infixOperators.length; i<len; i+=1 ) {
				matcher = makeInfixSequenceMatcher( infixOperators[i], fallthrough );
				fallthrough = matcher;
			}

			// Logical OR is the fallthrough for the conditional matcher
			getLogicalOr = fallthrough;
		}());
		

		// The conditional operator is the lowest precedence operator, so we start here
		getConditional = function ( tokenizer ) {
			var start, expression, ifTrue, ifFalse;

			expression = getLogicalOr( tokenizer );
			if ( !expression ) {
				return null;
			}

			start = tokenizer.pos;

			allowWhitespace( tokenizer );

			if ( !getStringMatch( tokenizer, '?' ) ) {
				tokenizer.pos = start;
				return expression;
			}

			allowWhitespace( tokenizer );

			ifTrue = getExpression( tokenizer );
			if ( !ifTrue ) {
				tokenizer.pos = start;
				return expression;
			}

			allowWhitespace( tokenizer );

			if ( !getStringMatch( tokenizer, ':' ) ) {
				tokenizer.pos = start;
				return expression;
			}

			allowWhitespace( tokenizer );

			ifFalse = getExpression( tokenizer );
			if ( !ifFalse ) {
				tokenizer.pos = start;
				return expression;
			}

			return {
				t: CONDITIONAL,
				o: [ expression, ifTrue, ifFalse ]
			};
		};
		


		getDigits = getRegexMatcher( /^[0-9]+/ );
		getExponent = getRegexMatcher( /^[eE][\-+]?[0-9]+/ );
		getFraction = getRegexMatcher( /^\.[0-9]+/ );
		getInteger = getRegexMatcher( /^(0|[1-9][0-9]*)/ );


		getReference = function ( tokenizer ) {
			var startPos, name, dot, combo, refinement, lastDotIndex;

			startPos = tokenizer.pos;

			// could be an implicit iterator ('.'), a prefixed reference ('.name') or a
			// standard reference ('name')
			dot = getStringMatch( tokenizer, '.' ) || '';
			name = getName( tokenizer ) || '';

			combo = dot + name;

			if ( !combo ) {
				return null;
			}

			while ( refinement = getDotRefinement( tokenizer ) || getArrayRefinement( tokenizer ) ) {
				combo += refinement;
			}

			if ( getStringMatch( tokenizer, '(' ) ) {
				
				// if this is a method invocation (as opposed to a function) we need
				// to strip the method name from the reference combo, else the context
				// will be wrong
				lastDotIndex = combo.lastIndexOf( '.' );
				if ( lastDotIndex !== -1 ) {
					combo = combo.substr( 0, lastDotIndex );
					tokenizer.pos = startPos + combo.length;
				} else {
					tokenizer.pos -= 1;
				}
			}

			return {
				t: REFERENCE,
				n: combo
			};
		};

		getRefinement = function ( tokenizer ) {
			var start, refinement, name, expr;

			start = tokenizer.pos;

			allowWhitespace( tokenizer );

			// "." name
			if ( getStringMatch( tokenizer, '.' ) ) {
				allowWhitespace( tokenizer );

				if ( name = getName( tokenizer ) ) {
					return {
						t: REFINEMENT,
						n: name
					};
				}

				fail( tokenizer, 'a property name' );
			}

			// "[" expression "]"
			if ( getStringMatch( tokenizer, '[' ) ) {
				allowWhitespace( tokenizer );

				expr = getExpression( tokenizer );
				if ( !expr ) {
					fail( tokenizer, 'an expression' );
				}

				allowWhitespace( tokenizer );

				if ( !getStringMatch( tokenizer, ']' ) ) {
					fail( tokenizer, '"]"' );
				}

				return {
					t: REFINEMENT,
					x: expr
				};
			}

			return null;
		};

		// Any literal except function and regexp literals, which aren't supported (yet?)
		getLiteral = function ( tokenizer ) {
			var literal = getNumberLiteral( tokenizer )   ||
			              getBooleanLiteral( tokenizer )  ||
			              getGlobal( tokenizer )          ||
			              getStringLiteral( tokenizer )   ||
			              getObjectLiteral( tokenizer )   ||
			              getArrayLiteral( tokenizer );

			return literal;
		};

		getArrayLiteral = function ( tokenizer ) {
			var start, array, expressionList;

			start = tokenizer.pos;

			// allow whitespace before '['
			allowWhitespace( tokenizer );

			if ( !getStringMatch( tokenizer, '[' ) ) {
				tokenizer.pos = start;
				return null;
			}

			expressionList = getExpressionList( tokenizer );

			if ( !getStringMatch( tokenizer, ']' ) ) {
				tokenizer.pos = start;
				return null;
			}

			return {
				t: ARRAY_LITERAL,
				o: expressionList
			};
		};

		getBooleanLiteral = function ( tokenizer ) {
			var remaining = tokenizer.remaining();

			if ( remaining.substr( 0, 4 ) === 'true' ) {
				tokenizer.pos += 4;
				return {
					t: BOOLEAN_LITERAL,
					v: 'true'
				};
			}

			if ( remaining.substr( 0, 5 ) === 'false' ) {
				tokenizer.pos += 5;
				return {
					t: BOOLEAN_LITERAL,
					v: 'false'
				};
			}

			return null;
		};

		globals = /^(?:Array|Date|RegExp|decodeURIComponent|decodeURI|encodeURIComponent|encodeURI|isFinite|isNaN|parseFloat|parseInt|JSON|Math|NaN|undefined|null)/;

		// Not strictly literals, but we can treat them as such because they
		// never need to be dereferenced.

		// Allowed globals:
		// ----------------
		//
		// Array, Date, RegExp, decodeURI, decodeURIComponent, encodeURI, encodeURIComponent, isFinite, isNaN, parseFloat, parseInt, JSON, Math, NaN, undefined, null
		getGlobal = function ( tokenizer ) {
			var start, name, match, global;

			start = tokenizer.pos;
			name = getName( tokenizer );

			if ( !name ) {
				return null;
			}

			match = globals.exec( name );
			if ( match ) {
				tokenizer.pos = start + match[0].length;
				return {
					t: GLOBAL,
					v: match[0]
				};
			}

			tokenizer.pos = start;
			return null;
		};

		getNumberLiteral = function ( tokenizer ) {
			var start, result;

			start = tokenizer.pos;

			// special case - we may have a decimal without a literal zero (because
			// some programmers are plonkers)
			if ( result = getFraction( tokenizer ) ) {
				return {
					t: NUMBER_LITERAL,
					v: result
				};
			}

			result = getInteger( tokenizer );
			if ( result === null ) {
				return null;
			}

			result += getFraction( tokenizer ) || '';
			result += getExponent( tokenizer ) || '';

			return {
				t: NUMBER_LITERAL,
				v: result
			};
		};

		getObjectLiteral = function ( tokenizer ) {
			var start, pairs, keyValuePairs, i, pair;

			start = tokenizer.pos;

			// allow whitespace
			allowWhitespace( tokenizer );

			if ( !getStringMatch( tokenizer, '{' ) ) {
				tokenizer.pos = start;
				return null;
			}

			keyValuePairs = getKeyValuePairs( tokenizer );

			// allow whitespace between final value and '}'
			allowWhitespace( tokenizer );

			if ( !getStringMatch( tokenizer, '}' ) ) {
				tokenizer.pos = start;
				return null;
			}

			return {
				t: OBJECT_LITERAL,
				m: keyValuePairs
			};
		};

		getKeyValuePairs = function ( tokenizer ) {
			var start, pairs, pair, keyValuePairs;

			start = tokenizer.pos;

			pair = getKeyValuePair( tokenizer );
			if ( pair === null ) {
				return null;
			}

			pairs = [ pair ];

			if ( getStringMatch( tokenizer, ',' ) ) {
				keyValuePairs = getKeyValuePairs( tokenizer );

				if ( !keyValuePairs ) {
					tokenizer.pos = start;
					return null;
				}

				return pairs.concat( keyValuePairs );
			}

			return pairs;
		};

		getKeyValuePair = function ( tokenizer ) {
			var start, pair, key, value;

			start = tokenizer.pos;

			// allow whitespace between '{' and key
			allowWhitespace( tokenizer );

			key = getKey( tokenizer );
			if ( key === null ) {
				tokenizer.pos = start;
				return null;
			}

			// allow whitespace between key and ':'
			allowWhitespace( tokenizer );

			// next character must be ':'
			if ( !getStringMatch( tokenizer, ':' ) ) {
				tokenizer.pos = start;
				return null;
			}

			// allow whitespace between ':' and value
			allowWhitespace( tokenizer );

			// next expression must be a, well... expression
			value = getExpression( tokenizer );
			if ( value === null ) {
				tokenizer.pos = start;
				return null;
			}

			return {
				t: KEY_VALUE_PAIR,
				k: key,
				v: value
			};
		};

		// http://mathiasbynens.be/notes/javascript-properties
		// can be any name, string literal, or number literal
		getKey = function ( tokenizer ) {
			return getName( tokenizer ) || getStringLiteral( tokenizer ) || getNumberLiteral( tokenizer );
		};

		getStringLiteral = function ( tokenizer ) {
			var start, string;

			start = tokenizer.pos;

			if ( getStringMatch( tokenizer, '"' ) ) {
				string = getDoubleQuotedString( tokenizer );
			
				if ( !getStringMatch( tokenizer, '"' ) ) {
					tokenizer.pos = start;
					return null;
				}

				return {
					t: STRING_LITERAL,
					v: string
				};
			}

			if ( getStringMatch( tokenizer, "'" ) ) {
				string = getSingleQuotedString( tokenizer );

				if ( !getStringMatch( tokenizer, "'" ) ) {
					tokenizer.pos = start;
					return null;
				}

				return {
					t: STRING_LITERAL,
					v: string
				};
			}

			return null;
		};
		
	}());


}());
// Ractive.parse
// ===============
//
// Takes in a string, and returns an object representing the parsed template.
// A parsed template is an array of 1 or more 'descriptors', which in some
// cases have children.
//
// The format is optimised for size, not readability, however for reference the
// keys for each descriptor are as follows:
//
// * r - Reference, e.g. 'mustache' in {{mustache}}
// * t - Type code (e.g. 1 is text, 2 is interpolator...)
// * f - Fragment. Contains a descriptor's children
// * e - Element name
// * a - map of element Attributes, or proxy event/transition Arguments
// * d - Dynamic proxy event/transition arguments
// * n - indicates an iNverted section
// * i - Index reference, e.g. 'num' in {{#section:num}}content{{/section}}
// * v - eVent proxies (i.e. when user e.g. clicks on a node, fire proxy event)
// * c - Conditionals (e.g. ['yes', 'no'] in {{condition ? yes : no}})
// * x - eXpressions
// * t1 - intro Transition
// * t2 - outro Transition

(function () {

	var onlyWhitespace, inlinePartialStart, inlinePartialEnd, parseCompoundTemplate;

	onlyWhitespace = /^\s*$/;

	inlinePartialStart = /<!--\s*\{\{\s*>\s*([a-zA-Z_$][a-zA-Z_$0-9]*)\s*}\}\s*-->/;
	inlinePartialEnd = /<!--\s*\{\{\s*\/\s*([a-zA-Z_$][a-zA-Z_$0-9]*)\s*}\}\s*-->/;

	parse = function ( template, options ) {
		var tokens, fragmentStub, json, token;

		options = options || {};

		// does this template include inline partials?
		if ( inlinePartialStart.test( template ) ) {
			return parseCompoundTemplate( template, options );
		}


		if ( options.sanitize === true ) {
			options.sanitize = {
				// blacklist from https://code.google.com/p/google-caja/source/browse/trunk/src/com/google/caja/lang/html/html4-elements-whitelist.json
				elements: 'applet base basefont body frame frameset head html isindex link meta noframes noscript object param script style title'.split( ' ' ),
				eventAttributes: true
			};
		}

		tokens = tokenize( template, options );

		if ( !options.preserveWhitespace ) {
			// remove first token if it only contains whitespace
			token = tokens[0];
			if ( token && ( token.type === TEXT ) && onlyWhitespace.test( token.value ) ) {
				tokens.shift();
			}

			// ditto last token
			token = tokens[ tokens.length - 1 ];
			if ( token && ( token.type === TEXT ) && onlyWhitespace.test( token.value ) ) {
				tokens.pop();
			}
		}
		
		fragmentStub = getFragmentStubFromTokens( tokens, options, options.preserveWhitespace );
		
		json = fragmentStub.toJson();

		if ( typeof json === 'string' ) {
			// If we return it as a string, Ractive will attempt to reparse it!
			// Instead we wrap it in an array. Ractive knows what to do then
			return [ json ];
		}

		return json;
	};

	
	parseCompoundTemplate = function ( template, options ) {
		var mainTemplate, remaining, partials, name, startMatch, endMatch;

		partials = {};

		mainTemplate = '';
		remaining = template;

		while ( startMatch = inlinePartialStart.exec( remaining ) ) {
			name = startMatch[1];

			mainTemplate += remaining.substr( 0, startMatch.index );
			remaining = remaining.substring( startMatch.index + startMatch[0].length );

			endMatch = inlinePartialEnd.exec( remaining );

			if ( !endMatch || endMatch[1] !== name ) {
				throw new Error( 'Inline partials must have a closing delimiter, and cannot be nested' );
			}

			partials[ name ] = parse( remaining.substr( 0, endMatch.index ), options );

			remaining = remaining.substring( endMatch.index + endMatch[0].length );
		}

		return {
			template: parse( mainTemplate, options ),
			partials: partials
		};
	};

}());
tokenize = function ( template, options ) {
	var tokenizer, tokens, token, last20, next20;

	options = options || {};

	tokenizer = {
		str: stripHtmlComments( template ),
		pos: 0,
		delimiters: options.delimiters || [ '{{', '}}' ],
		tripleDelimiters: options.tripleDelimiters || [ '{{{', '}}}' ],
		remaining: function () {
			return tokenizer.str.substring( tokenizer.pos );
		}
	};

	tokens = [];

	while ( tokenizer.pos < tokenizer.str.length ) {
		token = getToken( tokenizer );

		if ( token === null && tokenizer.remaining() ) {
			last20 = tokenizer.str.substr( 0, tokenizer.pos ).substr( -20 );
			if ( last20.length === 20 ) {
				last20 = '...' + last20;
			}

			next20 = tokenizer.remaining().substr( 0, 20 );
			if ( next20.length === 20 ) {
				next20 = next20 + '...';
			}

			throw new Error( 'Could not parse template: ' + ( last20 ? last20 + '<- ' : '' ) + 'failed at character ' + tokenizer.pos + ' ->' + next20 );
		}

		tokens[ tokens.length ] = token;
	}

	stripStandalones( tokens );
	stripCommentTokens( tokens );
	
	return tokens;
};
Ractive.prototype = proto;

Ractive.adaptors = adaptors;
Ractive.eventDefinitions = eventDefinitions;
Ractive.partials = {};

Ractive.easing = easing;
Ractive.extend = extend;
Ractive.interpolate = interpolate;
Ractive.interpolators = interpolators;
Ractive.parse = parse;

// TODO add some more transitions
Ractive.transitions = transitions;

Ractive.VERSION = VERSION;


// export as Common JS module...
if ( typeof module !== "undefined" && module.exports ) {
	module.exports = Ractive;
}

// ... or as AMD module
else if ( typeof define === "function" && define.amd ) {
	define( function () {
		return Ractive;
	});
}

// ... or as browser global
else {
	global.Ractive = Ractive;
}

}( this ));
var Song  = {
	search : function(query,callback) {
		$.get('/api/songs/search?query=' + query + '').done(callback);
	}
}
;
var songs = []

var searchView = new Ractive({
	el: $('#container'),
	template: RactiveTemplates['templates/search_view'],
	data: songs
});

searchView.on({
	search : function(event) {
		var query = 'banana';
		Song.search(query, function(data){
			console.log(data);
		});
	}
});
          this.RactiveTemplates || (this.RactiveTemplates = {});
          this.RactiveTemplates['app/templates/search_view'] = [{"t":7,"e":"div","a":{"class":"search-list"},"f":[{"t":7,"e":"header","a":{"id":"header"},"f":[{"t":7,"e":"input","a":{"id":"new-search","on-enter-change":"search","placeholder":"What needs to be done?","autofocus":""}}]}]}];
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//







;
