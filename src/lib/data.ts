import { promises as fs } from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')

/**
 * 读取 JSON 文件
 */
export async function readJsonFile<T = any>(filename: string): Promise<T[]> {
  const filePath = path.join(DATA_DIR, filename)
  try {
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error(`读取 ${filename} 失败:`, error)
    return []
  }
}

/**
 * 写入 JSON 文件
 */
export async function writeJsonFile<T = any>(filename: string, data: T[]): Promise<boolean> {
  const filePath = path.join(DATA_DIR, filename)
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')
    return true
  } catch (error) {
    console.error(`写入 ${filename} 失败:`, error)
    return false
  }
}

/**
 * 添加数据到 JSON 文件
 */
export async function appendJsonFile<T = any>(filename: string, item: T): Promise<boolean> {
  const data = await readJsonFile<T>(filename)
  data.push(item)
  return await writeJsonFile(filename, data)
}

/**
 * 更新数据项
 */
export async function updateJsonFile<T = any>(
  filename: string,
  id: string,
  updates: Partial<T>
): Promise<boolean> {
  const data = await readJsonFile<T>(filename)
  const index = data.findIndex((item: any) => item.id === id)
  if (index === -1) return false
  
  data[index] = { ...data[index], ...updates }
  return await writeJsonFile(filename, data)
}

/**
 * 删除数据项
 */
export async function deleteJsonFile(filename: string, id: string): Promise<boolean> {
  const data = await readJsonFile(filename)
  const filteredData = data.filter((item: any) => item.id !== id)
  return await writeJsonFile(filename, filteredData)
}

/**
 * 查找数据项
 */
export function findJsonItem<T = any>(data: T[], id: string): T | undefined {
  return data.find((item: any) => item.id === id)
}

/**
 * 搜索数据
 */
export function searchJsonData<T = any>(data: T[], query: string): T[] {
  const lowerQuery = query.toLowerCase()
  return data.filter((item: any) => {
    return Object.values(item).some((value: any) =>
      String(value).toLowerCase().includes(lowerQuery)
    )
  })
}

/**
 * 按类别过滤
 */
export function filterByCategory<T = any>(data: T[], category: string): T[] {
  return data.filter((item: any) => {
    if (category === 'all') return true
    return item.category === category || item.tags?.includes(category)
  })
}

/**
 * 获取热门数据
 */
export function getPopularData<T = any>(data: T[], count: number = 4): T[] {
  return data
    .filter((item: any) => item.popular || item.hot)
    .slice(0, count)
}

/**
 * 增加统计数据
 */
export async function incrementStats(
  filename: string,
  id: string,
  statField: 'views' | 'used' | 'likes'
): Promise<boolean> {
  const data = await readJsonFile(filename)
  const item = findJsonItem(data, id)
  if (!item) return false
  
  if (typeof item[statField] === 'number') {
    item[statField]++
  } else if (typeof item[statField] === 'string') {
    const num = Number(item[statField].replace(/[^0-9]/g, '')) || 0
    item[statField] = String(num + 1)
  }
  
  item.updatedAt = new Date().toISOString()
  return await updateJsonFile(filename, id, item)
}

/**
 * 更新时间戳
 */
export async function updateTimestamp(filename: string, id: string): Promise<boolean> {
  return updateJsonFile(filename, id, {
    updatedAt: new Date().toISOString()
  })
}
