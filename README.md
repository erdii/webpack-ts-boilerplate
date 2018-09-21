# webpack + typescript boilerplate

work in progress

### Usage
TODO

### Features
* css extraction
* typescript support
* dynamic bundle splitting with hashed filenames for eternal caching
* targets es6 browser runtimes
* hmr for css files

### TSX

enable react/tsx support by adding this to `tsconfig.json`:

```javascript
{
	"compilerOptions": {
		"jsx": "react",
		"jsxFactory": "React.createElement",
		// ...
	},
	// ...
}
```
