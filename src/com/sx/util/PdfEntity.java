package com.sx.util;

import java.io.OutputStream;
import java.util.List;

public class PdfEntity<T> {
	private String title; // ����
	private float margin_bottom = 50; // �±߾�
	private float margin_left = 50;
	private float margin_top = 50;
	private float margin_right = 50;
	private String pageSize = "A4"; // ֽ�Ŵ�С
	private String fileName = "E://report.pdf"; // �ļ����
	private String author = "Galo"; // ����
	private String subject = "Zhang"; // ����
	private boolean creationDate = true; // ����ʱ��
	private String creator = "Galo"; // ������
	private String keywords = "����"; // �ؼ���
	private String pageHeader; // ҳü
	private String pageFooter; // ҳ��

	private String[] headers; // ��ͷ
	private List<T> dataset; // ��ݼ�
	private OutputStream os; // �ļ������

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public float getMargin_bottom() {
		return margin_bottom;
	}

	public void setMargin_bottom(float margin_bottom) {
		this.margin_bottom = margin_bottom;
	}

	public float getMargin_left() {
		return margin_left;
	}

	public void setMargin_left(float margin_left) {
		this.margin_left = margin_left;
	}

	public float getMargin_top() {
		return margin_top;
	}

	public void setMargin_top(float margin_top) {
		this.margin_top = margin_top;
	}

	public float getMargin_right() {
		return margin_right;
	}

	public void setMargin_right(float margin_right) {
		this.margin_right = margin_right;
	}

	public String getPageSize() {
		return pageSize;
	}

	public void setPageSize(String pageSize) {
		this.pageSize = pageSize;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public boolean isCreationDate() {
		return creationDate;
	}

	public void setCreationDate(boolean creationDate) {
		this.creationDate = creationDate;
	}

	public String getCreator() {
		return creator;
	}

	public void setCreator(String creator) {
		this.creator = creator;
	}

	public String getKeywords() {
		return keywords;
	}

	public void setKeywords(String keywords) {
		this.keywords = keywords;
	}

	public String getPageHeader() {
		return pageHeader;
	}

	public void setPageHeader(String pageHeader) {
		this.pageHeader = pageHeader;
	}

	public String getPageFooter() {
		return pageFooter;
	}

	public void setPageFooter(String pageFooter) {
		this.pageFooter = pageFooter;
	}

	public String[] getHeaders() {
		return headers;
	}

	public void setHeaders(String[] headers) {
		this.headers = headers;
	}

	public List<T> getDataset() {
		return dataset;
	}

	public void setDataset(List<T> dataset) {
		this.dataset = dataset;
	}

	public OutputStream getOs() {
		return os;
	}

	public void setOs(OutputStream os) {
		this.os = os;
	}
}
