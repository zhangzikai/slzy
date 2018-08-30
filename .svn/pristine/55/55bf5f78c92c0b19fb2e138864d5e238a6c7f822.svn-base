package com.sx.base;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.orm.ObjectRetrievalFailureException;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.util.Assert;


/**
 * This class serves as the Base class for all other DAOs - namely to hold
 * common CRUD methods that they might all use. You should only need to extend
 * this class when your require custom CRUD logic.
 * <p/>
 * <p>
 * To register this class in your Spring context file, use the following XML.
 * 
 * <pre>
 *      &lt;bean id="fooDao" class="com.sinosoft.zywx3.dao.hibernate.GenericDaoHibernate"&gt;
 *          &lt;constructor-arg value="com.sinosoft.zywx3.model.Foo"/&gt;
 *      &lt;/bean&gt;
 * </pre>
 * 
 * @author <a href="mailto:bwnoll@gmail.com">Bryan Noll</a>
 * @param <T>
 *            a type variable
 * @param <PK>
 *            the primary key for that type
 */
@SuppressWarnings("unchecked")
public class GenericDaoHibernate<T, PK extends Serializable> implements
		GenericDao<T, PK> {
	/**
	 * Log variable for all child classes. Uses LogFactory.getLog(getClass())
	 * from Commons Logging
	 */
	protected final Log log = LogFactory.getLog(getClass());
	private Class<T> persistentClass;
	private HibernateTemplate hibernateTemplate;
	private SessionFactory sessionFactory;

	/**
	 * Constructor that takes in a class to see which type of entity to persist.
	 * Use this constructor when subclassing.
	 * 
	 * @param persistentClass
	 *            the class type you'd like to persist
	 */
	public GenericDaoHibernate(final Class<T> persistentClass) {
		this.persistentClass = persistentClass;
	}

	/**
	 * Constructor that takes in a class and sessionFactory for easy creation of
	 * DAO.
	 * 
	 * @param persistentClass
	 *            the class type you'd like to persist
	 * @param sessionFactory
	 *            the pre-configured Hibernate SessionFactory
	 */
	public GenericDaoHibernate(final Class<T> persistentClass,
			SessionFactory sessionFactory) {
		this.persistentClass = persistentClass;
		this.sessionFactory = sessionFactory;
		this.hibernateTemplate = new HibernateTemplate(sessionFactory);
	}

	/**
	 * @return the persistentClass
	 */
	public Class<T> getPersistentClass() {
		return persistentClass;
	}

	public HibernateTemplate getHibernateTemplate() {
		return this.hibernateTemplate;
	}

	public SessionFactory getSessionFactory() {
		return this.sessionFactory;
	}

	/**
	 * @Desc 获取当前Session
	 * @Date 2012-8-31上午09:28:01
	 * @Auth RXH
	 * @return
	 */
	public Session getSession() {
		Session session = getSessionFactory().getCurrentSession();
		if (session == null)
			session = getSessionFactory().openSession();
		return session;
	}

	@Autowired
	@Required
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
		this.hibernateTemplate = new HibernateTemplate(sessionFactory);
	}

	/**
	 * {@inheritDoc}
	 */
	public List<T> getAll() {
		return hibernateTemplate.loadAll(getPersistentClass());
	}

	/**
	 * {@inheritDoc}
	 */
	@SuppressWarnings("rawtypes")
	public List<T> getAllDistinct() {
		Collection result = new LinkedHashSet(getAll());
		return new ArrayList(result);
	}

	/**
	 * {@inheritDoc}
	 */
	public T get(PK id) {
		T entity = (T) hibernateTemplate.get(getPersistentClass(), id);

		if (entity == null) {
			log.warn("Uh oh, '" + getPersistentClass() + "' object with id '"
					+ id + "' not found...");
			throw new ObjectRetrievalFailureException(getPersistentClass(), id);
		}

		return entity;
	}

	/**
	 * {@inheritDoc}
	 */
	public boolean exists(PK id) {
		T entity = (T) hibernateTemplate.get(getPersistentClass(), id);
		return entity != null;
	}

	/**
	 * {@inheritDoc}
	 */
	public T save(T object) {
		return (T) hibernateTemplate.merge(object);
	}

	/**
	 * {@inheritDoc}
	 */
	public void remove(PK id) {
		hibernateTemplate.delete(this.get(id));
	}

	/**
	 * {@inheritDoc}
	 */
	public List<T> findByNamedQuery(String queryName,
			Map<String, Object> queryParams) {
		String[] params = new String[queryParams.size()];
		Object[] values = new Object[queryParams.size()];
		int index = 0;
		for (String s : queryParams.keySet()) {
			params[index] = s;
			values[index++] = queryParams.get(s);
		}
		return hibernateTemplate.findByNamedQueryAndNamedParam(queryName,
				params, values);
	}

	/**
	 * @Desc 创建Query对象.对于需要first,max,fetchsize,cache,cacheRegion等诸多设置的函数,可以在返回Query后自行设置。可以连续设置如下：
	 * 		 xXXDao.createQuery(hql).setMaxResult(100).setCacheable(true).list();
	 * @Date 2012-8-23下午04:49:17
	 * @Auth RXH
	 * @param hql
	 * @param values
	 * @return
	 */
	public Query createQuery(String hql, Object... params) {
		Assert.hasText(hql);
		Query query = getSession().createQuery(hql);
		for (int i = 0; i < params.length; i++) {
			query.setParameter(i, params[i]);
		}
		return query;
	}
	
	/**
	 * @Desc 创建Query对象，
	 * 			hql语句使用方式：from Entity e where e.name=:name
	 * 			params.put("name","entityName");
	 * @Date 2012-8-31上午10:14:42
	 * @Auth RXH
	 * @param hql
	 * @param params
	 * @return
	 */
	public Query createQuery(String hql, Map<String,String> params){
		Assert.hasText(hql);
		Query query = getSession().createQuery(hql);
		Set<String> keys = params.keySet();
		for(String key : keys){
			query.setString(key, params.get(key));
		}
		return query;
	}

	/**
	 * @Desc 创建SQLQuery对象
	 * @Date 2012-8-31上午09:25:47
	 * @Auth RXH
	 * @param sql
	 * @param values
	 * @return
	 */
	public SQLQuery createSqlQuery(String sql, Object... params) {
		Assert.hasText(sql);
		SQLQuery sqlQuery = getSession().createSQLQuery(sql);
		for (int i = 0; i < params.length; i++) {
			sqlQuery.setParameter(i, params[i]);
		}
		return sqlQuery;
	}

	/**
	 * @Desc 创建Criteria对象.
	 * @Date 2012-8-23下午04:45:07
	 * @Auth RXH
	 * @param entityClass
	 * @param criterions
	 * @return
	 * @param criterions
	 *            可变的Restrictions条件列表,见{@link #createQuery(String,Object...)}
	 */
	public Criteria createCriteria(Criterion... criterions) {
		Criteria criteria = getSession().createCriteria(getPersistentClass());
		for (Criterion c : criterions) {
			criteria.add(c);
		}
		return criteria;
	}

	/**
	 * @Desc 创建Criteria对象，带排序字段与升降序字段.
	 * @Date 2012-8-23下午04:44:38
	 * @Auth RXH
	 * @param entityClass
	 * @param orderBy
	 * @param isAsc
	 * @param criterions
	 * @return
	 * @see #createCriteria(Class,Criterion[])
	 */
	public Criteria createCriteria(String orderBy, boolean isAsc,
			Criterion... criterions) {
		Assert.hasText(orderBy);
		Criteria criteria = createCriteria(criterions);
		if (isAsc)
			criteria.addOrder(Order.asc(orderBy));
		else
			criteria.addOrder(Order.desc(orderBy));
		return criteria;
	}


	/**
	 * (non-Javadoc)
	 * 
	 * @see com.sinosoft.base.GenericDao#pageQuery(java.lang.Integer,
	 *      java.lang.Integer)
	 */
	public DataPage<T> pageQuery(Integer pageNo, Integer pageSize) {
		String hql = " from " + getPersistentClass().getSimpleName();
		if (pageNo == null || pageSize == null) {
			return paginationAssistant(hql);
		}
		Assert.isTrue(pageNo >= 1, "pageNo should start from 1");
		// Count查询
		int totalCount = queryCount(hql);
		if (totalCount < 1)
			return new DataPage<T>();
		// 实际查询返回分页对象
		int startIndex = DataPage.getStartOfPage(pageNo, pageSize);
		List<T> list = createQuery(hql).setFirstResult(startIndex).setMaxResults(pageSize).list();
		return new DataPage<T>(startIndex, totalCount, pageSize, list);
	}

	/**
	 * (non-Javadoc)
	 * 
	 * @see com.sinosoft.base.GenericDao#pageQuery(java.lang.String,
	 *      java.lang.Integer, java.lang.Integer, java.lang.Object[])
	 */
	public DataPage<T> pageQuery(String hql, Integer pageNo, Integer pageSize,
			Object... values) {
		Assert.hasText(hql);
		if (pageNo == null || pageSize == null) {
			return paginationAssistant(hql,values);
		}
		Assert.isTrue(pageNo >= 1, "pageNo should start from 1");
		// Count查询
		int totalCount = queryCount(removeSelect(removeOrders(hql)),values);
		if (totalCount < 1)
			return new DataPage<T>();
		// 实际查询返回分页对象
		int startIndex = DataPage.getStartOfPage(pageNo, pageSize);
		Query query = createQuery(hql, values);
		List<T> list = query.setFirstResult(startIndex).setMaxResults(pageSize).list();
		return new DataPage<T>(startIndex, totalCount, pageSize, list);
	}
	
	/**
	 * @Desc 查询数据库中的记录总数
	 * @Date 2012-8-24上午09:34:19
	 * @Auth RXH
	 * @param countQueryString
	 * @return
	 */
	private int queryCount(String countQueryString, Object ...values ) {
		countQueryString = " select count(*) " + countQueryString;
		String totalRows = createQuery(countQueryString,values).uniqueResult().toString();
		return new Integer(totalRows).intValue();
	}
	
	/**
	 * @Desc 当页数或者页面记录数为null时，分页返回内容
	 * @Date 2012-8-31上午09:46:34
	 * @Auth RXH
	 * @param hql
	 * @return
	 */
	private DataPage<T> paginationAssistant(String hql,Object... values){
		List<T> dataList = createQuery(hql,values).list();
		if(dataList == null || dataList.size() == 0){
			return new DataPage<T>();
		} else {
			return new DataPage<T>(0, dataList.size(), dataList.size(), dataList);
		}
	}

	/**
	 * @Desc 去除hql的select子句，未考虑union的情况,用于pagedQuery. 如果有“fetch”，则去掉
	 * @Date 2012-8-24上午09:34:34
	 * @Auth RXH
	 * @param hql
	 * @return
	 */
	private static String removeSelect(String hql) {
		Assert.hasText(hql);
		int beginPos = hql.toLowerCase().indexOf("from");
		Assert.isTrue(beginPos != -1, " hql : " + hql
				+ " must has a keyword 'from'");
		return hql.substring(beginPos).replace("fetch", "");
	}

	/**
	 * @Desc 去除hql的orderby子句，用于pagedQuery.
	 * @Date 2012-8-24上午09:34:49
	 * @Auth RXH
	 * @param hql
	 * @return
	 */
	private static String removeOrders(String hql) {
		Assert.hasText(hql);
		Pattern p = Pattern.compile("order\\s*by[\\w|\\W|\\s|\\S]*",
				Pattern.CASE_INSENSITIVE);
		Matcher m = p.matcher(hql);
		StringBuffer sb = new StringBuffer();
		while (m.find()) {
			m.appendReplacement(sb, "");
		}
		m.appendTail(sb);
		return sb.toString();
	}

	@Override
	public void execute(String hql) {
		// TODO Auto-generated method stub
		Connection conn=getSessionFactory().openSession().connection();
		Statement stm = null;
        try {
        	stm = conn.createStatement();
			stm.executeUpdate(hql);
		} catch (SQLException e1) {
			e1.printStackTrace();
		} 
		try {
			if(null != conn)
				conn.close();
			if(null != stm)
				stm.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}
