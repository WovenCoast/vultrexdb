"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite_1 = __importDefault(require("sqlite"));
class SQLiteProvider {
    constructor(config) {
        this.initialized = false;
        this.tableName = config.name || "Vultrex";
        this.fileName = config.fileName || "VultrexDB";
    }
    async init() {
        this.db = await sqlite_1.default.open(`./${this.fileName}.db`);
        await this.db.run(`CREATE TABLE IF NOT EXISTS '${this.tableName}' (key TEXT PRIMARY KEY, value TEXT);`);
        this.initialized = true;
    }
    async set(key, value) {
        this.db.run(`INSERT OR REPLACE INTO '${this.tableName}' (key, value) VALUES(?, ?);`, key, JSON.stringify(value));
    }
    async get(key, defaultValue) {
        const data = await this.db.get(`SELECT * FROM '${this.tableName}';`);
        if (data !== null) {
            return JSON.parse(data["value"]);
        }
        return defaultValue;
    }
    async getAll() {
        const data = await this.db.all(`SELECT * FROM '${this.tableName}';`);
        return data.map(data => ({ key: data["key"], value: JSON.parse(data["value"]) }));
    }
    async size() {
        const data = await this.db.get(`SELECT count(*) FROM '${this.tableName}';`);
        return data["count(*)"];
    }
    async delete(key) {
        this.db.run(`DELETE FROM '${this.tableName}' WHERE key = ?;`, key);
    }
    async clear() {
        this.db.run(`DELETE FROM '${this.tableName}';`);
    }
}
exports.SQLiteProvider = SQLiteProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1FMaXRlUHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJvdmlkZXJzL1NRTGl0ZVByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0RBQTBDO0FBSTFDLE1BQWEsY0FBYztJQVExQixZQUFtQixNQUE2QjtRQUZ6QyxnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUduQyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFJLElBQUksU0FBUyxDQUFDO1FBQzFDLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsSUFBSSxXQUFXLENBQUM7SUFDaEQsQ0FBQztJQUVNLEtBQUssQ0FBQyxJQUFJO1FBQ2hCLElBQUksQ0FBQyxFQUFFLEdBQUcsTUFBTSxnQkFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxRQUFRLEtBQUssQ0FBQyxDQUFDO1FBQ3JELE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsK0JBQStCLElBQUksQ0FBQyxTQUFTLHVDQUF1QyxDQUFDLENBQUM7UUFDeEcsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7SUFDekIsQ0FBQztJQUVNLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBb0IsRUFBRSxLQUFVO1FBQ2hELElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLDJCQUEyQixJQUFJLENBQUMsU0FBUyw4QkFBOEIsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ2xILENBQUM7SUFFTSxLQUFLLENBQUMsR0FBRyxDQUFJLEdBQW9CLEVBQUUsWUFBaUI7UUFDMUQsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUM7UUFDckUsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO1lBQ2xCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztTQUNqQztRQUNELE9BQU8sWUFBWSxDQUFDO0lBQ3JCLENBQUM7SUFFTSxLQUFLLENBQUMsTUFBTTtRQUNsQixNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLGtCQUFrQixJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQztRQUNyRSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBRU0sS0FBSyxDQUFDLElBQUk7UUFDaEIsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUM7UUFDNUUsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVNLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBb0I7UUFDdkMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxTQUFTLGtCQUFrQixFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFTSxLQUFLLENBQUMsS0FBSztRQUNqQixJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUM7SUFDakQsQ0FBQztDQUNEO0FBaERELHdDQWdEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzcWxpdGUsIHsgRGF0YWJhc2UgfSBmcm9tIFwic3FsaXRlXCI7XG5pbXBvcnQgeyBTUUxpdGVQcm92aWRlck9wdGlvbnMgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9TUUxpdGVQcm92aWRlck9wdGlvbnNcIjtcbmltcG9ydCB7IFJvd0RhdGEgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9Sb3dEYXRhXCI7XG5cbmV4cG9ydCBjbGFzcyBTUUxpdGVQcm92aWRlciB7XG5cblx0cHJpdmF0ZSBkYjogRGF0YWJhc2U7XG5cblx0cHJpdmF0ZSB0YWJsZU5hbWU6IHN0cmluZztcblx0cHJpdmF0ZSBmaWxlTmFtZTogc3RyaW5nO1xuXHRwdWJsaWMgaW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblx0XG5cdHB1YmxpYyBjb25zdHJ1Y3Rvcihjb25maWc6IFNRTGl0ZVByb3ZpZGVyT3B0aW9ucykge1xuXHRcdHRoaXMudGFibGVOYW1lID0gY29uZmlnLm5hbWUgfHwgXCJWdWx0cmV4XCI7XG5cdFx0dGhpcy5maWxlTmFtZSA9IGNvbmZpZy5maWxlTmFtZSB8fCBcIlZ1bHRyZXhEQlwiO1xuXHR9XG5cblx0cHVibGljIGFzeW5jIGluaXQoKSB7XG5cdFx0dGhpcy5kYiA9IGF3YWl0IHNxbGl0ZS5vcGVuKGAuLyR7dGhpcy5maWxlTmFtZX0uZGJgKTtcblx0XHRhd2FpdCB0aGlzLmRiLnJ1bihgQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgJyR7dGhpcy50YWJsZU5hbWV9JyAoa2V5IFRFWFQgUFJJTUFSWSBLRVksIHZhbHVlIFRFWFQpO2ApO1xuXHRcdHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuXHR9XG5cblx0cHVibGljIGFzeW5jIHNldChrZXk6IHN0cmluZyB8IG51bWJlciwgdmFsdWU6IGFueSkge1xuXHRcdHRoaXMuZGIucnVuKGBJTlNFUlQgT1IgUkVQTEFDRSBJTlRPICcke3RoaXMudGFibGVOYW1lfScgKGtleSwgdmFsdWUpIFZBTFVFUyg/LCA/KTtgLCBrZXksIEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XG5cdH1cblxuXHRwdWJsaWMgYXN5bmMgZ2V0PFQ+KGtleTogc3RyaW5nIHwgbnVtYmVyLCBkZWZhdWx0VmFsdWU6IGFueSk6IFByb21pc2U8VD4ge1xuXHRcdGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLmRiLmdldChgU0VMRUNUICogRlJPTSAnJHt0aGlzLnRhYmxlTmFtZX0nO2ApO1xuXHRcdGlmIChkYXRhICE9PSBudWxsKSB7XG5cdFx0XHRyZXR1cm4gSlNPTi5wYXJzZShkYXRhW1widmFsdWVcIl0pO1xuXHRcdH1cblx0XHRyZXR1cm4gZGVmYXVsdFZhbHVlO1xuXHR9XG5cblx0cHVibGljIGFzeW5jIGdldEFsbCgpOiBQcm9taXNlPFJvd0RhdGFbXT4ge1xuXHRcdGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLmRiLmFsbChgU0VMRUNUICogRlJPTSAnJHt0aGlzLnRhYmxlTmFtZX0nO2ApO1xuXHRcdHJldHVybiBkYXRhLm1hcChkYXRhID0+ICh7IGtleTogZGF0YVtcImtleVwiXSwgdmFsdWU6IEpTT04ucGFyc2UoZGF0YVtcInZhbHVlXCJdKSB9KSk7XG5cdH1cblxuXHRwdWJsaWMgYXN5bmMgc2l6ZSgpOiBQcm9taXNlPGFueT4ge1xuXHRcdGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLmRiLmdldChgU0VMRUNUIGNvdW50KCopIEZST00gJyR7dGhpcy50YWJsZU5hbWV9JztgKTtcblx0XHRyZXR1cm4gZGF0YVtcImNvdW50KCopXCJdO1xuXHR9XG5cblx0cHVibGljIGFzeW5jIGRlbGV0ZShrZXk6IHN0cmluZyB8IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuZGIucnVuKGBERUxFVEUgRlJPTSAnJHt0aGlzLnRhYmxlTmFtZX0nIFdIRVJFIGtleSA9ID87YCwga2V5KTtcblx0fVxuXG5cdHB1YmxpYyBhc3luYyBjbGVhcigpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLmRiLnJ1bihgREVMRVRFIEZST00gJyR7dGhpcy50YWJsZU5hbWV9JztgKTtcblx0fVxufSJdfQ==