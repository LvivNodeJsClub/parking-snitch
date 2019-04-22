export default interface IDbConnection {
	init(): Promise<void>;
}
