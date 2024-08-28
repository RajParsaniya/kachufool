export class ArrayUtils {
	private constructor() {}

	public static shuffle<T>(values: Array<T>): Array<T> {
		return values
			.map((value) => ({ value, sort: Math.random() }))
			.sort((a, b) => a.sort - b.sort)
			.map(({ value }) => value);
	}

	public static batches<T>(values: Array<T>, batchSize: number): Array<Array<T>> {
		const batchCount: number = Math.floor(values.length / batchSize);
		return values.reduce((result, _, index) => {
			if (index % batchSize === 0 && result.length < batchCount) {
				result.push(values.slice(index, index + batchSize));
			}
			return result;
		}, [] as Array<Array<T>>);
	}

	public static sequence<T>(index: number, values: Array<T>, predicate?: (value: T, index: number) => boolean): Array<T> {
		if (predicate !== undefined) {
			const filteredValues: Array<T> = values.filter(predicate);
			const excludedValues: Array<T> = values.filter((value) => !filteredValues.includes(value));
			return Array.from({ length: filteredValues.length }, (_, i) => filteredValues[(index + i) % filteredValues.length]).concat(excludedValues);
		} else {
			return Array.from({ length: values.length }, (_, i) => values[(index + i) % values.length]);
		}
	}

	public static random<T>(values: Array<T>): T {
		return values[Math.floor(Math.random() * values.length)];
	}

	public static order(values: Array<number>): Array<number> {
		const uniqueValues = Array.from(new Set(values)).sort((a, b) => b - a);
		const valueToOrder = new Map();
		uniqueValues.forEach((value, index) => {
			valueToOrder.set(value, index + 1);
		});
		return values.map((value) => valueToOrder.get(value));
	}
}
